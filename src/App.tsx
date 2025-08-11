import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AIgeneration from './pages/AIgeneration';
import AIrequirementsjob from './pages/AIrequirementsjob';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/presentation/ai-generation" element={<AIgeneration />} />
      <Route path="/presentation/ai-requirements-job" element={<AIrequirementsjob />} />
    </Routes>
  );
}

export default App;
