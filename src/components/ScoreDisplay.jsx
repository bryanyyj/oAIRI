function ScoreDisplay({ readinessData }) {
  const { label, description, color } = readinessData;

  const colorClasses = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-400',
    green: 'text-green-700 bg-green-50 border-green-400',
    yellow: 'text-yellow-700 bg-yellow-50 border-yellow-400',
    orange: 'text-orange-700 bg-orange-50 border-orange-400',
    red: 'text-red-700 bg-red-50 border-red-400'
  };

  const iconClasses = {
    emerald: 'text-emerald-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  const colorClass = colorClasses[color] || colorClasses.yellow;
  const iconClass = iconClasses[color] || iconClasses.yellow;

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Assessment Complete!</h2>
        <p className="text-lg text-gray-600">Thank you for completing the readiness assessment.</p>
      </div>

      <div className={`p-10 rounded-xl border-3 ${colorClass} text-center`}>
        <div className="mb-4">
          <svg className={`w-20 h-20 mx-auto ${iconClass}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="text-sm font-bold uppercase tracking-wider mb-3 opacity-75">
          Your Readiness Level
        </div>

        <div className="text-5xl font-bold mb-6">
          {label}
        </div>

        <p className="text-xl leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ScoreDisplay;
