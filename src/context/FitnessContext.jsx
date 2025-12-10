import React, { createContext, useState, useEffect, useContext } from 'react';

const FitnessContext = createContext();

export const useFitness = () => useContext(FitnessContext);

export const FitnessProvider = ({ children }) => {
  // Initial State Loaders
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [workouts, setWorkouts] = useState(() => loadState('fitjourney_workouts', []));
  const [goals, setGoals] = useState(() => loadState('fitjourney_goals', {
    steps: 10000,
    calories: 2500,
    activeMinutes: 60
  }));
  const [userStats, setUserStats] = useState(() => loadState('fitjourney_stats', {
    weight: 70, // kg
    height: 175, // cm
    age: 25
  }));

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('fitjourney_workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('fitjourney_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('fitjourney_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Actions
  const addWorkout = (workout) => {
    const newWorkout = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...workout
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const updateGoal = (type, value) => {
    setGoals(prev => ({ ...prev, [type]: parseInt(value) || 0 }));
  };

  const updateUserStats = (stats) => {
    setUserStats(prev => ({ ...prev, ...stats }));
  };

  // Derived Stats Helpers
  const getTodayStats = () => {
    const today = new Date().toDateString();
    const todayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === today);
    
    return todayWorkouts.reduce((acc, curr) => ({
      steps: acc.steps + (parseInt(curr.steps) || 0),
      calories: acc.calories + (parseInt(curr.calories) || 0),
      duration: acc.duration + (parseInt(curr.duration) || 0)
    }), { steps: 0, calories: 0, duration: 0 });
  };

  return (
    <FitnessContext.Provider value={{
      workouts,
      goals,
      userStats,
      addWorkout,
      deleteWorkout,
      updateGoal,
      updateUserStats,
      getTodayStats
    }}>
      {children}
    </FitnessContext.Provider>
  );
};
