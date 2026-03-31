// Readiness Assessment Framework (20 questions × 5 points max = 100 points)
export const READINESS_LEVELS = {
  EXPERT: {
    label: 'Expert Ready',
    range: [85, 100],
    description: 'Demonstrates exceptional decision-making and readiness across all scenarios',
    color: 'emerald'
  },
  ADVANCED: {
    label: 'Advanced Ready',
    range: [70, 84],
    description: 'Shows strong readiness with consistent good judgment',
    color: 'green'
  },
  INTERMEDIATE: {
    label: 'Moderately Ready',
    range: [55, 69],
    description: 'Displays adequate readiness with room for development',
    color: 'yellow'
  },
  DEVELOPING: {
    label: 'Developing',
    range: [40, 54],
    description: 'Shows basic readiness but needs significant improvement',
    color: 'orange'
  },
  NOVICE: {
    label: 'Novice',
    range: [20, 39],
    description: 'Limited readiness; requires substantial training and support',
    color: 'red'
  }
};

// Shuffle function to randomize option order
export function shuffleOptions(options) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Scenario-based questions with weighted action options
export const scenarios = [
  {
    id: 1,
    category: 'Crisis Management',
    scenario: 'Your team discovers a critical security breach that has exposed customer data. The breach happened 2 hours ago, and customers are starting to notice unusual activity.',
    question: 'What is your immediate course of action?',
    options: [
      {
        id: 'a',
        text: 'Immediately notify all affected customers via email and social media, then begin investigation',
        weight: 3,
        rationale: 'Transparent but may cause panic without a plan'
      },
      {
        id: 'b',
        text: 'Assemble incident response team, contain the breach, assess impact, then communicate with stakeholders following protocol',
        weight: 5,
        rationale: 'Methodical, professional approach following best practices'
      },
      {
        id: 'c',
        text: 'Wait to gather all facts before taking any action to avoid spreading misinformation',
        weight: 1,
        rationale: 'Dangerous delay; immediate containment is critical'
      },
      {
        id: 'd',
        text: 'Shut down all systems immediately to prevent further damage, then investigate',
        weight: 2,
        rationale: 'Reactive but may cause unnecessary business disruption'
      },
      {
        id: 'e',
        text: 'Contact legal and PR teams first, then follow their guidance on next steps',
        weight: 4,
        rationale: 'Good stakeholder involvement but technical response should start immediately'
      }
    ]
  },
  {
    id: 2,
    category: 'Team Leadership',
    scenario: 'Two of your senior team members have a fundamental disagreement about the technical approach for a high-stakes project. The conflict is affecting team morale and the project deadline is in 3 weeks.',
    question: 'How do you handle this situation?',
    options: [
      {
        id: 'a',
        text: 'Make an executive decision on which approach to use and direct the team to follow it',
        weight: 2,
        rationale: 'Decisive but may disengage team members and miss better solutions'
      },
      {
        id: 'b',
        text: 'Facilitate a structured discussion where both members present their approaches with pros/cons, then make a decision based on project goals',
        weight: 5,
        rationale: 'Collaborative, data-driven approach that maintains team respect'
      },
      {
        id: 'c',
        text: 'Let them work it out themselves since they\'re senior team members',
        weight: 1,
        rationale: 'Abdication of leadership responsibility'
      },
      {
        id: 'd',
        text: 'Compromise by combining elements from both approaches',
        weight: 3,
        rationale: 'May appease both sides but could result in suboptimal solution'
      },
      {
        id: 'e',
        text: 'Escalate to your manager or bring in an external technical expert to decide',
        weight: 4,
        rationale: 'Gets expert input but may undermine your authority'
      }
    ]
  },
  {
    id: 3,
    category: 'Strategic Planning',
    scenario: 'Your company is considering adopting a new technology that could provide competitive advantage, but it requires significant investment and retraining of 60% of your team. Early adopters in the industry have had mixed results.',
    question: 'What approach do you recommend?',
    options: [
      {
        id: 'a',
        text: 'Fully commit to the new technology immediately to stay ahead of competitors',
        weight: 2,
        rationale: 'Bold but risky without proper validation'
      },
      {
        id: 'b',
        text: 'Conduct a pilot program with a small team, measure results against KPIs, then make a data-driven decision to scale or pivot',
        weight: 5,
        rationale: 'Strategic, measured approach that minimizes risk while gathering evidence'
      },
      {
        id: 'c',
        text: 'Wait until the technology matures and more companies prove its value',
        weight: 3,
        rationale: 'Risk-averse but may miss competitive window'
      },
      {
        id: 'd',
        text: 'Reject the technology and double down on current proven methods',
        weight: 1,
        rationale: 'Overly conservative; ignores potential benefits'
      },
      {
        id: 'e',
        text: 'Survey the team to gauge interest and make a decision based on team enthusiasm',
        weight: 4,
        rationale: 'Considers team input but decision should be based on business value'
      }
    ]
  },
  {
    id: 4,
    category: 'Resource Management',
    scenario: 'You have a fixed budget and must choose between: hiring two junior developers to increase team capacity, or investing in training and tools for your existing team to improve efficiency.',
    question: 'How do you allocate the budget?',
    options: [
      {
        id: 'a',
        text: 'Hire the junior developers to increase team size and output',
        weight: 3,
        rationale: 'Increases capacity but adds onboarding overhead'
      },
      {
        id: 'b',
        text: 'Invest in training and tools for existing team to boost productivity',
        weight: 4,
        rationale: 'Strengthens current team but doesn\'t increase headcount'
      },
      {
        id: 'c',
        text: 'Analyze current bottlenecks, team skill gaps, and project pipeline, then allocate based on data and long-term strategy',
        weight: 5,
        rationale: 'Evidence-based decision aligned with organizational needs'
      },
      {
        id: 'd',
        text: 'Split the budget 50/50 between both options',
        weight: 2,
        rationale: 'Compromise but may result in insufficient investment in either area'
      },
      {
        id: 'e',
        text: 'Save the budget for now until a critical need emerges',
        weight: 1,
        rationale: 'Missed opportunity for strategic investment'
      }
    ]
  },
  {
    id: 5,
    category: 'Stakeholder Communication',
    scenario: 'A major project you\'re leading is going to miss its deadline by 3 weeks due to unexpected technical challenges. The client has already communicated this deadline to their stakeholders.',
    question: 'How do you communicate this to the client?',
    options: [
      {
        id: 'a',
        text: 'Send an email explaining the delay and apologizing for the inconvenience',
        weight: 2,
        rationale: 'Informative but impersonal; lacks proactive problem-solving'
      },
      {
        id: 'b',
        text: 'Schedule a call to explain the situation, present a revised timeline with milestones, offer interim deliverables, and discuss mitigation strategies',
        weight: 5,
        rationale: 'Professional, proactive approach with solutions and transparency'
      },
      {
        id: 'c',
        text: 'Work extra hours to try to meet the deadline before telling the client anything',
        weight: 1,
        rationale: 'Risky; delays communication and may burn out team without solving problem'
      },
      {
        id: 'd',
        text: 'Tell the client immediately via message with a new deadline, without detailed explanation',
        weight: 3,
        rationale: 'Timely but lacks context and doesn\'t build trust'
      },
      {
        id: 'e',
        text: 'Have your manager communicate the delay to the client instead',
        weight: 4,
        rationale: 'Escalates appropriately but you should be part of the conversation'
      }
    ]
  },
  {
    id: 6,
    category: 'Performance Management',
    scenario: 'A team member has been consistently missing deadlines and the quality of their work has declined over the past month. They were previously a strong performer.',
    question: 'What is your first step?',
    options: [
      {
        id: 'a',
        text: 'Document the performance issues and schedule a formal performance improvement plan meeting',
        weight: 3,
        rationale: 'Formal but may be premature without understanding the root cause'
      },
      {
        id: 'b',
        text: 'Have a private, supportive conversation to understand what\'s changed and identify any obstacles or personal challenges',
        weight: 5,
        rationale: 'Empathetic and investigative; addresses root cause before escalating'
      },
      {
        id: 'c',
        text: 'Reassign their critical tasks to other team members to ensure project success',
        weight: 2,
        rationale: 'Short-term fix but doesn\'t address the underlying problem'
      },
      {
        id: 'd',
        text: 'Ignore it for now and see if the situation improves on its own',
        weight: 1,
        rationale: 'Avoidance; issues will likely worsen without intervention'
      },
      {
        id: 'e',
        text: 'Send them an email outlining your concerns and asking for improvement',
        weight: 4,
        rationale: 'Documents concerns but lacks personal touch for sensitive issue'
      }
    ]
  },
  {
    id: 7,
    category: 'Conflict Resolution',
    scenario: 'During a team meeting, two colleagues have a heated argument about project priorities. The tension is affecting the entire team\'s ability to focus and collaborate.',
    question: 'How do you handle this situation in the moment?',
    options: [
      {
        id: 'a',
        text: 'Let them finish the discussion, then move on to the next agenda item',
        weight: 1,
        rationale: 'Avoids confrontation but leaves conflict unresolved'
      },
      {
        id: 'b',
        text: 'Immediately call a break, then meet with both parties separately to understand their perspectives before reconvening',
        weight: 5,
        rationale: 'De-escalates situation and addresses conflict systematically'
      },
      {
        id: 'c',
        text: 'Decide on the priority yourself and tell both parties to follow your decision',
        weight: 3,
        rationale: 'Decisive but doesn\'t address underlying conflict or relationship repair'
      },
      {
        id: 'd',
        text: 'Ask both parties to present their cases to the team and vote on the best approach',
        weight: 2,
        rationale: 'Democratic but may create winners/losers and deepen division'
      },
      {
        id: 'e',
        text: 'Acknowledge the disagreement, propose a follow-up discussion with relevant stakeholders, and redirect the meeting to other topics',
        weight: 4,
        rationale: 'Professional containment but may delay needed resolution'
      }
    ]
  },
  {
    id: 8,
    category: 'Change Management',
    scenario: 'Your organization is implementing a major process change that will significantly alter how your team works. Several team members are resistant and expressing concerns about increased workload.',
    question: 'What is your approach to leading this change?',
    options: [
      {
        id: 'a',
        text: 'Implement the change as directed and expect the team to adapt over time',
        weight: 1,
        rationale: 'Authoritarian approach that ignores legitimate concerns'
      },
      {
        id: 'b',
        text: 'Hold a series of workshops to explain the rationale, demonstrate benefits, involve team in implementation planning, and establish feedback mechanisms',
        weight: 5,
        rationale: 'Comprehensive change management with engagement and support'
      },
      {
        id: 'c',
        text: 'Advocate to leadership that the change should be delayed until the team is more receptive',
        weight: 2,
        rationale: 'Avoids difficult conversation but may not be realistic'
      },
      {
        id: 'd',
        text: 'Implement the change in phases, starting with willing team members as champions',
        weight: 4,
        rationale: 'Strategic phasing but may benefit from more upfront communication'
      },
      {
        id: 'e',
        text: 'Hold a town hall meeting to address concerns and provide training resources',
        weight: 3,
        rationale: 'Good communication but may lack ongoing support structure'
      }
    ]
  },
  {
    id: 9,
    category: 'Decision Making Under Uncertainty',
    scenario: 'You need to choose between two vendor proposals for a critical system. One is cheaper but from an unknown vendor; the other is 40% more expensive but from a proven partner. You have incomplete information about both.',
    question: 'How do you proceed with this decision?',
    options: [
      {
        id: 'a',
        text: 'Choose the cheaper option to save budget and deal with issues if they arise',
        weight: 1,
        rationale: 'Cost-focused but ignores risk assessment'
      },
      {
        id: 'b',
        text: 'Conduct a structured evaluation: request references, proof of concepts, detailed risk analysis, and calculate total cost of ownership before deciding',
        weight: 5,
        rationale: 'Thorough, risk-based decision making with proper due diligence'
      },
      {
        id: 'c',
        text: 'Go with the proven partner to minimize risk, regardless of cost',
        weight: 3,
        rationale: 'Risk-averse but may miss opportunity and strain budget'
      },
      {
        id: 'd',
        text: 'Ask your team to vote on which vendor they prefer',
        weight: 2,
        rationale: 'Delegates decision without proper framework or expertise consideration'
      },
      {
        id: 'e',
        text: 'Negotiate with both vendors for better terms before deciding',
        weight: 4,
        rationale: 'Good commercial approach but needs to be combined with technical evaluation'
      }
    ]
  },
  {
    id: 10,
    category: 'Innovation & Creativity',
    scenario: 'A junior team member proposes an unconventional solution to a persistent problem. It\'s creative but untested, and implementing it would require significant time and resources with uncertain outcomes.',
    question: 'How do you respond?',
    options: [
      {
        id: 'a',
        text: 'Reject the idea and stick with proven approaches to avoid risk',
        weight: 1,
        rationale: 'Safe but stifles innovation and team member engagement'
      },
      {
        id: 'b',
        text: 'Ask them to develop a detailed proposal with proof of concept, success metrics, and risk mitigation plan, then evaluate against current approach',
        weight: 5,
        rationale: 'Encourages innovation while maintaining rigor and accountability'
      },
      {
        id: 'c',
        text: 'Immediately greenlight the idea to encourage innovation and team morale',
        weight: 2,
        rationale: 'Supportive but lacks due diligence for resource commitment'
      },
      {
        id: 'd',
        text: 'Suggest they implement it as a side project without affecting main work',
        weight: 3,
        rationale: 'Allows exploration but may not provide adequate support or recognition'
      },
      {
        id: 'e',
        text: 'Allocate a small budget for them to prototype and validate core assumptions first',
        weight: 4,
        rationale: 'Balances innovation with validation but may benefit from clearer framework'
      }
    ]
  },
  {
    id: 11,
    category: 'Customer Relations',
    scenario: 'A long-term client is threatening to cancel their contract due to a service issue. The issue was caused by a limitation in your product that cannot be quickly resolved. They want an immediate solution or they will switch to a competitor.',
    question: 'What is your response strategy?',
    options: [
      {
        id: 'a',
        text: 'Promise to fix the issue immediately even though you know it cannot be done quickly',
        weight: 1,
        rationale: 'Dishonest; will damage trust when deadline is missed'
      },
      {
        id: 'b',
        text: 'Schedule an urgent meeting to acknowledge the issue, explain honestly what can and cannot be done, offer interim workarounds, discuss long-term roadmap, and negotiate fair terms',
        weight: 5,
        rationale: 'Transparent, solution-oriented approach that preserves relationship'
      },
      {
        id: 'c',
        text: 'Accept that they will leave and focus on other clients',
        weight: 2,
        rationale: 'Defeatist; doesn\'t attempt to preserve valuable relationship'
      },
      {
        id: 'd',
        text: 'Offer them a significant discount to compensate for the inconvenience',
        weight: 3,
        rationale: 'Addresses cost concern but doesn\'t solve the core issue'
      },
      {
        id: 'e',
        text: 'Escalate to senior leadership to handle the negotiation',
        weight: 4,
        rationale: 'Appropriate escalation but you should be actively involved'
      }
    ]
  },
  {
    id: 12,
    category: 'Ethical Dilemma',
    scenario: 'You discover that a colleague has been inflating their performance metrics in reports to management. This has resulted in them receiving recognition and potentially affecting team resource allocation.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Ignore it as it\'s not your responsibility to monitor others',
        weight: 1,
        rationale: 'Unethical; allows dishonest behavior to continue unchecked'
      },
      {
        id: 'b',
        text: 'Speak privately with the colleague first to understand the situation and encourage them to correct it, then escalate to management if needed',
        weight: 5,
        rationale: 'Ethical and professional approach giving benefit of doubt while ensuring accountability'
      },
      {
        id: 'c',
        text: 'Immediately report the colleague to HR and their manager',
        weight: 3,
        rationale: 'Addresses issue but may be unnecessarily harsh without understanding context'
      },
      {
        id: 'd',
        text: 'Anonymously report the discrepancies through the company\'s ethics hotline',
        weight: 4,
        rationale: 'Safe escalation but misses opportunity for direct resolution'
      },
      {
        id: 'e',
        text: 'Mention it casually to your manager and let them decide what to do',
        weight: 2,
        rationale: 'Deflects responsibility and may spread information inappropriately'
      }
    ]
  },
  {
    id: 13,
    category: 'Time Management',
    scenario: 'You have three urgent tasks all due today: a critical bug fix, a presentation for executives, and a client deliverable. You can only complete two of them on time.',
    question: 'How do you prioritize?',
    options: [
      {
        id: 'a',
        text: 'Work on whichever task you feel most confident completing',
        weight: 1,
        rationale: 'Comfort-based prioritization ignores business impact'
      },
      {
        id: 'b',
        text: 'Assess impact and urgency of each, communicate with stakeholders about constraints, negotiate deadlines or delegate where possible, then focus on highest business value',
        weight: 5,
        rationale: 'Strategic prioritization with stakeholder communication and resource optimization'
      },
      {
        id: 'c',
        text: 'Try to complete all three by working late into the night',
        weight: 2,
        rationale: 'Unsustainable; quality will likely suffer across all tasks'
      },
      {
        id: 'd',
        text: 'Focus on the client deliverable since external commitments take priority',
        weight: 3,
        rationale: 'Logical but doesn\'t consider relative business impact or bug severity'
      },
      {
        id: 'e',
        text: 'Partially complete all three and request extensions for final deliverables',
        weight: 4,
        rationale: 'Spreads risk but may result in three incomplete tasks'
      }
    ]
  },
  {
    id: 14,
    category: 'Quality vs Speed',
    scenario: 'Your team is behind schedule on a project. To meet the deadline, you could skip some testing and documentation, or you could maintain quality standards and request a deadline extension.',
    question: 'What do you decide?',
    options: [
      {
        id: 'a',
        text: 'Skip testing and documentation to meet the deadline',
        weight: 1,
        rationale: 'Dangerous shortcut; introduces technical debt and potential failures'
      },
      {
        id: 'b',
        text: 'Evaluate the risks and business impact with stakeholders, propose minimum viable quality standards, and negotiate realistic timeline based on priorities',
        weight: 5,
        rationale: 'Balanced approach involving stakeholders in risk-based decision'
      },
      {
        id: 'c',
        text: 'Request deadline extension to maintain full quality standards',
        weight: 3,
        rationale: 'Maintains quality but may damage stakeholder trust without exploring alternatives'
      },
      {
        id: 'd',
        text: 'Meet the deadline but plan to address quality gaps in a follow-up release',
        weight: 4,
        rationale: 'Pragmatic compromise if communicated clearly to stakeholders'
      },
      {
        id: 'e',
        text: 'Reduce project scope to deliver a quality product on time',
        weight: 2,
        rationale: 'Could work but needs stakeholder agreement on which features to cut'
      }
    ]
  },
  {
    id: 15,
    category: 'Delegation & Trust',
    scenario: 'A critical project component needs to be completed, and a capable team member has asked to lead it. However, you are concerned about the high stakes and are tempted to do it yourself to ensure it is done right.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Do it yourself to guarantee quality and meet expectations',
        weight: 1,
        rationale: 'Micromanagement; limits team growth and your own capacity'
      },
      {
        id: 'b',
        text: 'Delegate the task with clear expectations, success criteria, and checkpoints, while making yourself available for guidance',
        weight: 5,
        rationale: 'Empowering delegation with appropriate oversight and support'
      },
      {
        id: 'c',
        text: 'Give them the task but review and approve every decision they make',
        weight: 2,
        rationale: 'Delegates in name only; still bottlenecks progress'
      },
      {
        id: 'd',
        text: 'Split the task and do the most critical parts yourself',
        weight: 3,
        rationale: 'Partial delegation but may signal lack of trust'
      },
      {
        id: 'e',
        text: 'Delegate but assign someone to shadow and learn from them',
        weight: 4,
        rationale: 'Good for knowledge sharing but may be resource-inefficient'
      }
    ]
  },
  {
    id: 16,
    category: 'Learning & Development',
    scenario: 'You realize your technical skills in an emerging area are becoming outdated, and this is affecting your ability to contribute to strategic discussions. You have limited time due to current work commitments.',
    question: 'How do you address this skills gap?',
    options: [
      {
        id: 'a',
        text: 'Continue focusing on your current work and rely on team members for that expertise',
        weight: 1,
        rationale: 'Avoids the problem; will fall further behind'
      },
      {
        id: 'b',
        text: 'Create a learning plan with specific goals, schedule dedicated time for study, apply new skills to current projects, and seek mentorship or training resources',
        weight: 5,
        rationale: 'Systematic approach to professional development with practical application'
      },
      {
        id: 'c',
        text: 'Attend a weekend workshop or boot camp to get up to speed quickly',
        weight: 3,
        rationale: 'Shows initiative but may lack depth and ongoing practice'
      },
      {
        id: 'd',
        text: 'Watch online tutorials in your spare time when you can',
        weight: 2,
        rationale: 'Passive learning without structure or accountability'
      },
      {
        id: 'e',
        text: 'Request to be assigned to a project that would force you to learn these skills',
        weight: 4,
        rationale: 'Learn-by-doing approach but may risk project success'
      }
    ]
  },
  {
    id: 17,
    category: 'Feedback & Communication',
    scenario: 'You receive critical feedback from your manager about your leadership style. The feedback is difficult to hear and you partially disagree with their assessment.',
    question: 'How do you respond?',
    options: [
      {
        id: 'a',
        text: 'Defend your approach and explain why their assessment is incorrect',
        weight: 1,
        rationale: 'Defensive; closes door to growth and damages relationship'
      },
      {
        id: 'b',
        text: 'Listen fully without interrupting, ask clarifying questions to understand specific examples, reflect on the feedback, and develop an action plan while requesting ongoing dialogue',
        weight: 5,
        rationale: 'Mature, growth-oriented response that builds trust'
      },
      {
        id: 'c',
        text: 'Accept the feedback politely but don\'t change your behavior',
        weight: 2,
        rationale: 'Superficial acceptance without genuine reflection or growth'
      },
      {
        id: 'd',
        text: 'Ask for specific examples and seek feedback from others to validate the assessment',
        weight: 4,
        rationale: 'Good fact-finding but should be combined with reflection and action'
      },
      {
        id: 'e',
        text: 'Thank them for the feedback and think about it privately',
        weight: 3,
        rationale: 'Polite but misses opportunity for dialogue and understanding'
      }
    ]
  },
  {
    id: 18,
    category: 'Cross-Functional Collaboration',
    scenario: 'A project requires close collaboration with another department that has different priorities and timelines. Initial meetings have been unproductive, with both teams talking past each other.',
    question: 'What is your strategy to move forward?',
    options: [
      {
        id: 'a',
        text: 'Escalate to senior leadership to mandate the other department\'s cooperation',
        weight: 2,
        rationale: 'May create compliance but damages relationship and collaboration'
      },
      {
        id: 'b',
        text: 'Schedule a alignment workshop to establish shared goals, understand each team\'s constraints, create joint success metrics, and build a collaborative working rhythm',
        weight: 5,
        rationale: 'Structured approach to building genuine partnership'
      },
      {
        id: 'c',
        text: 'Work around the other department and complete what you can independently',
        weight: 1,
        rationale: 'Avoidance; project will likely fail without proper collaboration'
      },
      {
        id: 'd',
        text: 'Have informal coffee meetings with their team lead to build rapport',
        weight: 3,
        rationale: 'Good relationship building but needs formal alignment too'
      },
      {
        id: 'e',
        text: 'Propose a clear division of responsibilities and handoff points',
        weight: 4,
        rationale: 'Practical but may miss opportunity for deeper collaboration'
      }
    ]
  },
  {
    id: 19,
    category: 'Risk Management',
    scenario: 'During project planning, you identify a significant technical risk that could derail the project. Acknowledging it may make stakeholders lose confidence, but not addressing it could lead to failure later.',
    question: 'How do you handle this risk?',
    options: [
      {
        id: 'a',
        text: 'Don\'t mention it now and hope you can solve it as you go',
        weight: 1,
        rationale: 'Irresponsible; sets project up for failure'
      },
      {
        id: 'b',
        text: 'Present the risk transparently with probability and impact assessment, propose mitigation strategies, include contingency plans, and adjust timeline/budget accordingly',
        weight: 5,
        rationale: 'Professional risk management with stakeholder trust'
      },
      {
        id: 'c',
        text: 'Mention the risk briefly but downplay its significance',
        weight: 2,
        rationale: 'Partially transparent but misleads stakeholders'
      },
      {
        id: 'd',
        text: 'Work on solving the risk before bringing it to stakeholders\' attention',
        weight: 3,
        rationale: 'Proactive but delays transparency and stakeholder input'
      },
      {
        id: 'e',
        text: 'Present the risk and ask stakeholders whether to proceed or cancel the project',
        weight: 4,
        rationale: 'Transparent but should come with recommendations and mitigation plans'
      }
    ]
  },
  {
    id: 20,
    category: 'Organizational Politics',
    scenario: 'You are aware of a organizational change that will significantly impact your team, but you have been asked by leadership to keep it confidential until the official announcement next month. Your team is making decisions based on outdated assumptions.',
    question: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Tell your team about the change despite the confidentiality request',
        weight: 2,
        rationale: 'Breaks trust with leadership; damages your credibility'
      },
      {
        id: 'b',
        text: 'Respect confidentiality while gently steering team away from decisions that will be problematic, and advocate with leadership for earlier communication',
        weight: 5,
        rationale: 'Balances confidentiality with team protection and appropriate escalation'
      },
      {
        id: 'c',
        text: 'Say nothing and let the team make decisions that will need to be reversed',
        weight: 1,
        rationale: 'Passive; allows preventable waste of effort'
      },
      {
        id: 'd',
        text: 'Give vague hints to prepare the team without revealing specifics',
        weight: 3,
        rationale: 'Tries to help but may create confusion or rumors'
      },
      {
        id: 'e',
        text: 'Ask leadership for permission to share limited information with your team',
        weight: 4,
        rationale: 'Good approach but should be combined with guidance on current decisions'
      }
    ]
  }
];

// Helper function to calculate readiness level from score
export function getReadinessLevel(totalScore) {
  for (const [key, level] of Object.entries(READINESS_LEVELS)) {
    const [min, max] = level.range;
    if (totalScore >= min && totalScore <= max) {
      return {
        key,
        ...level,
        score: totalScore,
        percentage: Math.round((totalScore / 100) * 100)
      };
    }
  }
  return null;
}
