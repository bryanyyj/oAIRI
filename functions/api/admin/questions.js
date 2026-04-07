import { verifyToken, logSecurityEvent, corsHeaders } from '../../_lib/auth.js';

export async function onRequestOptions(context) {
  return new Response(null, { headers: corsHeaders(context.request, true) });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = corsHeaders(request, true);
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';

  // ── Auth ──────────────────────────────────────────────────────────────────
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logSecurityEvent('ADMIN_QUESTIONS_DENIED', { ip, reason: 'no token' });
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });
  }

  const ADMIN_PASSWORD = env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), { status: 500, headers: cors });
  }

  const valid = await verifyToken(token, ADMIN_PASSWORD);
  if (!valid) {
    logSecurityEvent('ADMIN_QUESTIONS_DENIED', { ip, reason: 'invalid or expired token' });
    return new Response(JSON.stringify({ error: 'Unauthorized - invalid or expired token' }), { status: 401, headers: cors });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  const { action } = body;

  try {
    // ── Create ──────────────────────────────────────────────────────────────
    if (action === 'create') {
      const { category, question, options } = body;

      if (!category || !question || !Array.isArray(options) || options.length < 2) {
        return new Response(
          JSON.stringify({ error: 'category, question, and at least 2 options are required' }),
          { status: 400, headers: cors }
        );
      }

      const { meta } = await env.DB.prepare(
        `INSERT INTO questions (category, question, order_num)
         VALUES (?, ?, (SELECT COALESCE(MAX(order_num), 0) + 1 FROM questions))`
      ).bind(category.trim(), question.trim()).run();

      const questionId = meta.last_row_id;
      for (const opt of options) {
        await env.DB.prepare(
          'INSERT INTO question_options (question_id, text, weight) VALUES (?, ?, ?)'
        ).bind(questionId, opt.text.trim(), parseInt(opt.weight)).run();
      }

      logSecurityEvent('ADMIN_QUESTION_CREATED', { ip, questionId });
      return new Response(JSON.stringify({ success: true, id: questionId }), { status: 200, headers: cors });
    }

    // ── Update ──────────────────────────────────────────────────────────────
    if (action === 'update') {
      const { id, category, question, options } = body;

      if (!id || !category || !question || !Array.isArray(options) || options.length < 2) {
        return new Response(
          JSON.stringify({ error: 'id, category, question, and at least 2 options are required' }),
          { status: 400, headers: cors }
        );
      }

      await env.DB.prepare(
        'UPDATE questions SET category=?, question=? WHERE id=?'
      ).bind(category.trim(), question.trim(), id).run();

      await env.DB.prepare('DELETE FROM question_options WHERE question_id=?').bind(id).run();
      for (const opt of options) {
        await env.DB.prepare(
          'INSERT INTO question_options (question_id, text, weight) VALUES (?, ?, ?)'
        ).bind(id, opt.text.trim(), parseInt(opt.weight)).run();
      }

      logSecurityEvent('ADMIN_QUESTION_UPDATED', { ip, questionId: id });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: cors });
    }

    // ── Delete ──────────────────────────────────────────────────────────────
    if (action === 'delete') {
      const { id } = body;
      if (!id) {
        return new Response(JSON.stringify({ error: 'id is required' }), { status: 400, headers: cors });
      }

      await env.DB.prepare('DELETE FROM question_options WHERE question_id=?').bind(id).run();
      await env.DB.prepare('DELETE FROM questions WHERE id=?').bind(id).run();

      logSecurityEvent('ADMIN_QUESTION_DELETED', { ip, questionId: id });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: cors });
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: cors }
    );

  } catch (error) {
    logSecurityEvent('ADMIN_QUESTIONS_ERROR', { ip, error: error.message });
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: cors });
  }
}
