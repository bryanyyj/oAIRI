import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
