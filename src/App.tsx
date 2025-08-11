import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrientationPage from './pages/OrientationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/presentation/orientation" element={<OrientationPage />} />
    </Routes>
  );
}

export default App;