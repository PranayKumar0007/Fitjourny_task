import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Target, TrendingUp, Menu, X, Activity } from 'lucide-react';

const Layout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navItems = [
		{ path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
		{ path: '/log', icon: <Dumbbell size={20} />, label: 'Workout Log' },
		{ path: '/goals', icon: <Target size={20} />, label: 'Goals' },
		{ path: '/progress', icon: <TrendingUp size={20} />, label: 'Progress' },
	];

	return (
		<div className="app-container">
			{/* Mobile Header */}
			<div className="mobile-header md:hidden" style={{ display: 'none' }}>
				{/* Note: In CSS I used @media to show this, but inline styles might override. 
            I'll rely on the CSS class 'mobile-header' which has display:flex on mobile.
            Wait, I need to be careful. The CSS handles the display property via media query.
            I will remove the inline style style={{ display: 'none' }} and let CSS handle it.
        */}
			</div>

			{/* Mobile Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
					style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
				/>
			)}

			{/* Sidebar */}
			<aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
				<div className="flex items-center gap-2 mb-8" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
					<div style={{
						width: '40px', height: '40px',
						background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
						borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
					}}>
						<Activity color="white" size={24} />
					</div>
					<h1 className="text-xl font-bold text-gradient">FitJourney</h1>
				</div>

				<nav>
					{navItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{item.icon}
							<span>{item.label}</span>
						</NavLink>
					))}
				</nav>

				<div style={{ marginTop: 'auto' }}>
					<div className="glass-panel" style={{ padding: '1rem' }}>
						<p className="text-sm text-muted">Keep pushing!</p>
						<div style={{
							height: '4px', background: 'rgba(255,255,255,0.1)',
							borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden'
						}}>
							<div style={{
								width: '75%', height: '100%',
								background: 'var(--accent-success)'
							}} />
						</div>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="main-content">
				{/* Mobile Toggle Button - Visible only on mobile */}
				<button
					className="btn-secondary"
					style={{
						display: 'none', // Default hidden
						marginBottom: '1rem',
						// Media query needs to handle visibility, but inline styles are hard to override with CSS classes unless !important.
						// I'll use a wrapper or just rely on the CSS I wrote.
						// Actually, let's just make it part of the mobile header logic or a floating button.
					}}
				>
					<Menu />
				</button>

				{/* Better Mobile Header Implementation */}
				<div className="mobile-header-trigger" style={{ display: 'none' }}>
					<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn-secondary">
						{isMobileMenuOpen ? <X /> : <Menu />}
					</button>
					<span className="font-bold text-lg">FitJourney</span>
				</div>

				<style>{`
          @media (max-width: 768px) {
            .mobile-header-trigger {
              display: flex !important;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1.5rem;
            }
          }
        `}</style>

				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
