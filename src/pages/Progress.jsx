import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Progress = () => {
	const { workouts, userStats, updateUserStats } = useFitness();
	const [weightInput, setWeightInput] = useState(userStats.weight);

	// Prepare Weekly Data
	const getWeeklyData = () => {
		const data = [];
		for (let i = 6; i >= 0; i--) {
			const d = new Date();
			d.setDate(d.getDate() - i);
			const dateStr = d.toDateString();

			const dayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === dateStr);
			const calories = dayWorkouts.reduce((acc, curr) => acc + (parseInt(curr.calories) || 0), 0);
			const duration = dayWorkouts.reduce((acc, curr) => acc + (parseInt(curr.duration) || 0), 0);

			data.push({
				name: d.toLocaleDateString('en-US', { weekday: 'short' }),
				calories,
				duration
			});
		}
		return data;
	};

	const weeklyData = getWeeklyData();

	const handleWeightUpdate = (e) => {
		e.preventDefault();
		updateUserStats({ weight: parseFloat(weightInput) });
	};

	return (
		<div className="animate-fade-in">
			<h2 className="text-2xl font-bold mb-8">Progress & Trends</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

				{/* Calories Chart */}
				<div className="glass-panel p-6" style={{ padding: '1.5rem' }}>
					<h3 className="text-lg font-bold mb-6">Weekly Calorie Burn</h3>
					<div style={{ height: '300px' }}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={weeklyData}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
								<XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
								<YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
								<Tooltip
									cursor={{ fill: 'rgba(255,255,255,0.05)' }}
									contentStyle={{
										backgroundColor: 'var(--bg-secondary)',
										border: '1px solid var(--glass-border)',
										borderRadius: '8px'
									}}
								/>
								<Bar dataKey="calories" fill="var(--accent-danger)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Duration Chart */}
				<div className="glass-panel p-6" style={{ padding: '1.5rem' }}>
					<h3 className="text-lg font-bold mb-6">Active Minutes Trend</h3>
					<div style={{ height: '300px' }}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={weeklyData}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
								<XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
								<YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
								<Tooltip
									contentStyle={{
										backgroundColor: 'var(--bg-secondary)',
										border: '1px solid var(--glass-border)',
										borderRadius: '8px'
									}}
								/>
								<Line
									type="monotone"
									dataKey="duration"
									stroke="var(--accent-warning)"
									strokeWidth={3}
									dot={{ fill: 'var(--bg-primary)', strokeWidth: 2 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Body Metrics */}
				<div className="glass-panel p-6" style={{ padding: '1.5rem' }}>
					<h3 className="text-lg font-bold mb-6">Body Metrics</h3>
					<form onSubmit={handleWeightUpdate} className="flex items-end gap-4">
						<div className="flex-1">
							<label className="block text-sm text-muted mb-2">Current Weight (kg)</label>
							<input
								type="number"
								step="0.1"
								value={weightInput}
								onChange={(e) => setWeightInput(e.target.value)}
								className="glass-input"
							/>
						</div>
						<button type="submit" className="btn-primary">Update</button>
					</form>

					<div className="mt-6 p-4 bg-white/5 rounded-lg">
						<div className="flex justify-between items-center mb-2">
							<span className="text-muted">BMI</span>
							<span className="font-bold text-xl">
								{(userStats.weight / ((userStats.height / 100) ** 2)).toFixed(1)}
							</span>
						</div>
						<p className="text-xs text-muted">Based on height: {userStats.height}cm</p>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Progress;
