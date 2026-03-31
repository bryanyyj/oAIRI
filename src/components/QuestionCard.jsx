function QuestionCard({ scenario, value, onChange }) {
  const { id, category, scenario: scenarioText, question, options } = scenario;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md mb-5 border border-gray-200">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
            {category}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            Q{id}
          </span>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 mb-3 rounded">
          <p className="text-sm text-gray-800 leading-snug">
            {scenarioText}
          </p>
        </div>

        <h3 className="text-sm font-semibold text-gray-900">
          {question}
        </h3>
      </div>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
              value === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={`scenario${id}`}
              value={option.id}
              checked={value === option.id}
              onChange={(e) => onChange(id, e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0"
            />
            <div className="ml-2.5 flex-1">
              <span className="text-sm text-gray-900 leading-snug block">
                {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
