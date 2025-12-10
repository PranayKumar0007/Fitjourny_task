import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Activity, Flame, Timer, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const { getTodayStats, goals, workouts } = useFitness();
	const stats = getTodayStats();

	// Prepare data for the chart (last 7 days)
	const getChartData = () => {
		const data = [];
		for (let i = 6; i >= 0; i--) {
			const d = new Date();
			d.setDate(d.getDate() - i);
			const dateStr = d.toDateString();

			const dayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === dateStr);
			const steps = dayWorkouts.reduce((acc, curr) => acc + (parseInt(curr.steps) || 0), 0);

			data.push({
				name: d.toLocaleDateString('en-US', { weekday: 'short' }),
				steps: steps
			});
		}
		return data;
	};

	const chartData = getChartData();

	const StatCard = ({ title, value, goal, icon: Icon, color }) => {
		const progress = Math.min((value / goal) * 100, 100);

		return (
			<div className="glass-panel stat-card">
				<div className="stat-icon" style={{ background: `${color}20`, color: color }}>
					<Icon size={24} />
				</div>
				<div style={{ flex: 1 }}>
					<p className="text-muted text-sm">{title}</p>
					<div className="flex items-end gap-2">
						<h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
						<span className="text-sm text-muted mb-1">/ {goal.toLocaleString()}</span>
					</div>
					<div style={{
						height: '6px', background: 'rgba(255,255,255,0.1)',
						borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden'
					}}>
						<div style={{
							width: `${progress}%`, height: '100%',
							background: color, transition: 'width 1s ease'
						}} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="animate-fade-in">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h2 className="text-2xl font-bold mb-1">Dashboard</h2>
					<p className="text-muted">Welcome back! Here's your daily activity.</p>
				</div>
				<Link to="/log" className="btn-primary flex items-center gap-2">
					<ArrowUpRight size={18} />
					Log Workout
				</Link>
			</div>

			<div className="dashboard-grid">
				<StatCard
					title="Steps"
					value={stats.steps}
					goal={goals.steps}
					icon={Activity}
					color="var(--accent-secondary)"
				/>
				<StatCard
					title="Calories Burned"
					value={stats.calories}
					goal={goals.calories}
					icon={Flame}
					color="var(--accent-danger)"
				/>
				<StatCard
					title="Active Minutes"
					value={stats.duration}
					goal={goals.activeMinutes}
					icon={Timer}
					color="var(--accent-warning)"
				/>
			</div>

			<div className="glass-panel p-6" style={{ padding: '1.5rem' }}>
				<h3 className="text-lg font-bold mb-6">Activity Trends</h3>
				<div style={{ height: '300px', width: '100%' }}>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
									<stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
							<XAxis
								dataKey="name"
								stroke="var(--text-secondary)"
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke="var(--text-secondary)"
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: 'var(--bg-secondary)',
									border: '1px solid var(--glass-border)',
									borderRadius: '8px'
								}}
							/>
							<Area
								type="monotone"
								dataKey="steps"
								stroke="var(--accent-primary)"
								fillOpacity={1}
								fill="url(#colorSteps)"
								strokeWidth={3}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
