import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, HeartPulse, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import Patients from './components/Patients';
import Nurses from './components/Nurses';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [view, setView] = useState('dashboard');

  if (!token) return <Login setToken={setToken} setUser={setUser} />;

  return (
    <div className="dashboard-layout">
      <Sidebar view={view} setView={setView} role={user.role} onLogout={() => { localStorage.clear(); setToken(null); }} />
      <main className="main-content">
        <Header title={view} user={user} />
        {view === 'dashboard' && <Dashboard token={token} />}
        {view === 'bookings' && <Bookings token={token} role={user.role} />}
        {view === 'patients' && <Patients token={token} />}
        {view === 'nurses' && <Nurses token={token} />}
        {view === 'settings' && <div className="card"><h3>System Settings</h3><p>Configure automated emails, backup schedules, and user roles.</p></div>}
      </main>
    </div>
  );
};

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
      } else { setError(data.error); }
    } catch { setError('Connection failed'); }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', background: '#0f172a', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><HeartPulse /></div>
          <h2>Visiting Nurse Admin</h2>
        </div>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label className="form-label">Email</label><input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Password</label><input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login Access</button>
          <div style={{ marginTop: '1.5rem', padding: '10px', background: '#f8fafc', fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Demo Access:</strong><br />
            Admin: admin@visitingnurse.lk / admin123<br />
            Nurse: nurse@visitingnurse.lk / nurse123
          </div>
        </form>
      </div>
    </div>
  );
};

const Sidebar = ({ view, setView, role, onLogout }) => (
  <aside className="sidebar">
    <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <HeartPulse color="#0ea5e9" /> Visiting Nurse
    </div>
    <nav style={{ flex: 1 }}>
      <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>
        <LayoutDashboard size={20} /> Dashboard
      </div>
      <div className={`nav-item ${view === 'bookings' ? 'active' : ''}`} onClick={() => setView('bookings')}>
        <Calendar size={20} /> Bookings
      </div>
      {role !== 'nurse' && (
        <>
          <div className={`nav-item ${view === 'patients' ? 'active' : ''}`} onClick={() => setView('patients')}>
            <Users size={20} /> Patients
          </div>
          <div className={`nav-item ${view === 'nurses' ? 'active' : ''}`} onClick={() => setView('nurses')}>
            <Activity size={20} /> Nurses
          </div>
        </>
      )}
      <div className={`nav-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
        <Settings size={20} /> Settings
      </div>
    </nav>
    <div className="sidebar-footer">
      <div className="nav-item" onClick={onLogout}>
        <LogOut size={20} /> Sign Out
      </div>
    </div>
  </aside>
);

const Header = ({ title, user }) => (
  <header className="header">
    <h1 style={{ textTransform: 'capitalize' }}>{title}</h1>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>{user.role}</div>
      </div>
      <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {user.name?.charAt(0)}
      </div>
    </div>
  </header>
);

export default Admin;
