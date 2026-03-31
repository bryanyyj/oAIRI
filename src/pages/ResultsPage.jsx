import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';
import { READINESS_LEVELS } from '../data/scenarios';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { readinessData } = location.state || {};

  useEffect(() => {
    // Redirect to assessment if no data
    if (!readinessData) {
      navigate('/');
    }
  }, [readinessData, navigate]);

  if (!readinessData) {
    return null;
  }

  const handleRetake = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScoreDisplay readinessData={readinessData} />

        <div className="mt-8 text-center">
          <button
            onClick={handleRetake}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-md"
          >
            Take Another Assessment
          </button>
        </div>

        <div className="mt-10 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Readiness Levels
          </h3>
          <div className="space-y-4">
            {Object.entries(READINESS_LEVELS).map(([key, level]) => {
              const colorClasses = {
                emerald: 'border-l-emerald-500 bg-emerald-50',
                green: 'border-l-green-500 bg-green-50',
                yellow: 'border-l-yellow-500 bg-yellow-50',
                orange: 'border-l-orange-500 bg-orange-50',
                red: 'border-l-red-500 bg-red-50'
              };

              return (
                <div
                  key={key}
                  className={`border-l-4 p-4 rounded ${colorClasses[level.color]}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{level.label}</p>
                      <p className="text-gray-700 mt-1">{level.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full">
                      {level.range[0]}-{level.range[1]} points
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
