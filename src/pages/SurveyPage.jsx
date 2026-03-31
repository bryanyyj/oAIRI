import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { scenarios, shuffleOptions } from '../data/scenarios';

function SurveyPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Shuffle options once on mount and keep them consistent
  const shuffledScenarios = useMemo(() => {
    return scenarios.map(scenario => ({
      ...scenario,
      options: shuffleOptions(scenario.options)
    }));
  }, []);

  // Pagination
  const questionsPerPage = 10;
  const totalPages = Math.ceil(scenarios.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentScenarios = shuffledScenarios.slice(startIndex, endIndex);

  const handleAnswerChange = (scenarioId, optionId) => {
    setAnswers(prev => ({ ...prev, [scenarioId]: optionId }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === scenarios.length;
  const currentPageAnswered = currentScenarios.every(s => answers[s.id]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isComplete) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit assessment');
      }

      const result = await response.json();

      // Navigate to results page with the readiness data
      navigate('/results', {
        state: {
          readinessData: result.readinessData
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to submit assessment. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Readiness Assessment
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Read each scenario carefully and select the action that best represents how you would respond.
          </p>
          <div className="mt-3 text-xs sm:text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentScenarios.map((scenario) => (
            <QuestionCard
              key={scenario.id}
              scenario={scenario}
              value={answers[scenario.id]}
              onChange={handleAnswerChange}
            />
          ))}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-6 py-4 rounded-lg mb-6">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-3 sm:p-4 shadow-lg rounded-t-lg">
            <ProgressBar answeredCount={answeredCount} totalQuestions={scenarios.length} />
            <div className="flex gap-2 sm:gap-3">
              {/* Previous Button */}
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transition-all"
                >
                  ← Previous
                </button>
              )}

              {/* Next or Submit Button */}
              {currentPage < totalPages ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!currentPageAnswered}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-white transition-all ${
                    currentPageAnswered
                      ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-md'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isComplete || isSubmitting}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-white transition-all ${
                    isComplete && !isSubmitting
                      ? 'bg-green-600 hover:bg-green-700 cursor-pointer shadow-md'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </button>
              )}
            </div>

            {/* Progress Message */}
            <div className="mt-2 sm:mt-3 text-center">
              {currentPage < totalPages && !currentPageAnswered && (
                <p className="text-xs sm:text-sm text-gray-500">
                  Please answer all questions on this page to continue
                </p>
              )}
              {currentPage === totalPages && !isComplete && (
                <p className="text-xs sm:text-sm text-gray-500">
                  Please answer all {scenarios.length} scenarios to submit
                </p>
              )}
              {isComplete && (
                <p className="text-xs sm:text-sm text-green-600 font-semibold">
                  ✓ All questions answered! Ready to submit.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SurveyPage;
