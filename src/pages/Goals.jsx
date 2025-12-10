import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Target, Edit2 } from 'lucide-react';

const Goals = () => {
	const { goals, updateGoal, getTodayStats } = useFitness();
	const stats = getTodayStats();

	const GoalCard = ({ type, label, unit, icon: Icon, color }) => {
		const current = stats[type] || 0; // Note: stats keys might differ slightly from goals keys
		// Mapping: goals.steps -> stats.steps, goals.calories -> stats.calories, goals.activeMinutes -> stats.duration

		let currentVal = 0;
		if (type === 'steps') currentVal = stats.steps;
		else if (type === 'calories') currentVal = stats.calories;
		else if (type === 'activeMinutes') currentVal = stats.duration;

		const target = goals[type];
		const progress = Math.min((currentVal / target) * 100, 100);

		return (
			<div className="glass-panel p-6" style={{ padding: '1.5rem' }}>
				<div className="flex justify-between items-start mb-4">
					<div className="flex items-center gap-3">
						<div className="p-3 rounded-lg" style={{ background: `${color}20`, color: color }}>
							<Icon size={24} />
						</div>
						<div>
							<h3 className="font-bold text-lg">{label}</h3>
							<p className="text-sm text-muted">Daily Goal</p>
						</div>
					</div>
					<div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1">
						<Edit2 size={14} className="text-muted" />
						<input
							type="number"
							value={target}
							onChange={(e) => updateGoal(type, e.target.value)}
							className="bg-transparent border-none text-right w-20 focus:outline-none font-bold"
						/>
						<span className="text-sm text-muted">{unit}</span>
					</div>
				</div>

				<div className="mb-2 flex justify-between text-sm">
					<span className="text-muted">Progress</span>
					<span className="font-bold">{Math.round(progress)}%</span>
				</div>

				<div style={{
					height: '10px', background: 'rgba(255,255,255,0.1)',
					borderRadius: '5px', overflow: 'hidden'
				}}>
					<div style={{
						width: `${progress}%`, height: '100%',
						background: color, transition: 'width 1s ease'
					}} />
				</div>

				<div className="mt-4 text-sm text-muted text-center">
					{currentVal.toLocaleString()} / {target.toLocaleString()} {unit}
				</div>
			</div>
		);
	};

	return (
		<div className="animate-fade-in">
			<h2 className="text-2xl font-bold mb-8">Fitness Goals</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
				<GoalCard
					type="steps"
					label="Steps"
					unit="steps"
					icon={Target}
					color="var(--accent-secondary)"
				/>
				<GoalCard
					type="calories"
					label="Calories"
					unit="kcal"
					icon={Target}
					color="var(--accent-danger)"
				/>
				<GoalCard
					type="activeMinutes"
					label="Active Time"
					unit="mins"
					icon={Target}
					color="var(--accent-warning)"
				/>
			</div>

			<div className="mt-12 glass-panel p-8 text-center" style={{ padding: '2rem', marginTop: '3rem' }}>
				<h3 className="text-xl font-bold mb-2">Why set goals?</h3>
				<p className="text-muted max-w-2xl mx-auto">
					Setting specific, measurable goals helps you stay motivated and track your progress effectively.
					Adjust your daily targets above to match your fitness journey.
				</p>
			</div>
		</div>
	);
};

export default Goals;
