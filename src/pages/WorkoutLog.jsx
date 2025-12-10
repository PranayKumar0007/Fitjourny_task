import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { Plus, Trash2, Calendar, Clock, Flame, Footprints } from 'lucide-react';

const WorkoutLog = () => {
	const { addWorkout, workouts, deleteWorkout } = useFitness();
	const [formData, setFormData] = useState({
		activity: 'Running',
		duration: '',
		calories: '',
		steps: '',
		date: new Date().toISOString().split('T')[0]
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		addWorkout(formData);
		setFormData(prev => ({
			...prev,
			duration: '',
			calories: '',
			steps: ''
		}));
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="animate-fade-in">
			<h2 className="text-2xl font-bold mb-8">Workout Log</h2>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
				{/* Log Form */}
				<div className="glass-panel p-6" style={{ padding: '1.5rem', height: 'fit-content' }}>
					<h3 className="text-lg font-bold mb-6 flex items-center gap-2">
						<Plus size={20} className="text-accent-primary" />
						Log New Activity
					</h3>

					<form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<div>
							<label className="block text-sm text-muted mb-1">Activity Type</label>
							<select
								name="activity"
								value={formData.activity}
								onChange={handleChange}
								className="glass-input"
							>
								<option value="Running">Running</option>
								<option value="Walking">Walking</option>
								<option value="Cycling">Cycling</option>
								<option value="Swimming">Swimming</option>
								<option value="Gym">Gym / Weightlifting</option>
								<option value="Yoga">Yoga</option>
								<option value="HIIT">HIIT</option>
							</select>
						</div>

						<div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
							<div>
								<label className="block text-sm text-muted mb-1">Duration (min)</label>
								<input
									type="number"
									name="duration"
									value={formData.duration}
									onChange={handleChange}
									className="glass-input"
									placeholder="30"
									required
								/>
							</div>
							<div>
								<label className="block text-sm text-muted mb-1">Calories</label>
								<input
									type="number"
									name="calories"
									value={formData.calories}
									onChange={handleChange}
									className="glass-input"
									placeholder="250"
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm text-muted mb-1">Steps (Optional)</label>
							<input
								type="number"
								name="steps"
								value={formData.steps}
								onChange={handleChange}
								className="glass-input"
								placeholder="5000"
							/>
						</div>

						<div>
							<label className="block text-sm text-muted mb-1">Date</label>
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleChange}
								className="glass-input"
								required
							/>
						</div>

						<button type="submit" className="btn-primary mt-4">
							Add Entry
						</button>
					</form>
				</div>

				{/* History List */}
				<div className="lg:col-span-2" style={{ gridColumn: 'span 2' }}>
					<h3 className="text-lg font-bold mb-4">Recent History</h3>
					<div className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						{workouts.length === 0 ? (
							<div className="glass-panel p-8 text-center text-muted" style={{ padding: '2rem' }}>
								No workouts logged yet. Start moving!
							</div>
						) : (
							workouts.map((workout) => (
								<div key={workout.id} className="glass-panel p-4 flex items-center justify-between" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-lg bg-accent-primary/20 flex items-center justify-center text-accent-primary"
											style={{ width: '48px', height: '48px', borderRadius: '0.5rem', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
											<span className="font-bold text-lg">{workout.activity[0]}</span>
										</div>
										<div>
											<h4 className="font-bold">{workout.activity}</h4>
											<div className="flex gap-4 text-sm text-muted mt-1">
												<span className="flex items-center gap-1"><Calendar size={14} /> {new Date(workout.date).toLocaleDateString()}</span>
												<span className="flex items-center gap-1"><Clock size={14} /> {workout.duration}m</span>
												<span className="flex items-center gap-1"><Flame size={14} /> {workout.calories}kcal</span>
												{workout.steps && <span className="flex items-center gap-1"><Footprints size={14} /> {workout.steps}</span>}
											</div>
										</div>
									</div>
									<button
										onClick={() => deleteWorkout(workout.id)}
										className="p-2 hover:bg-white/5 rounded-full text-muted hover:text-accent-danger transition-colors"
										style={{ padding: '0.5rem', borderRadius: '9999px', background: 'transparent', border: 'none', cursor: 'pointer' }}
									>
										<Trash2 size={18} />
									</button>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutLog;
