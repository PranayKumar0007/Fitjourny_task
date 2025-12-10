import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FitnessProvider } from './context/FitnessContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import Goals from './pages/Goals';
import Progress from './pages/Progress';

function App() {
  return (
    <FitnessProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="log" element={<WorkoutLog />} />
            <Route path="goals" element={<Goals />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FitnessProvider>
  );
}

export default App;
