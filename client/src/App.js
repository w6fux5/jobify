import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  LandingPage,
  NotFoundPage,
  DashboardPage,
  RegisterPage,
} from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
