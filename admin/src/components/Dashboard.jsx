import React, { useEffect, useState } from 'react';
import { Clock, Activity, Users, CheckCircle, Calendar } from 'lucide-react';

const Dashboard = ({ token }) => {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        // Fetch Stats
        fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setStats(data));

        // Fetch Activity
        fetch('/api/admin/activity', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setActivity(data));
    }, [token]);

    if (!stats) return <div>Loading dashboard...</div>;

    return (
        <div>
            {/* KPI Cards */}
            <div className="stats-grid">
                <div className="stat-card" style={{ borderLeftColor: '#0ea5e9' }}>
                    <div className="stat-label">Total Bookings</div>
                    <div className="stat-value">{stats.total}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '5px' }}> Lifetime volume</div>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#f59e0b' }}>
                    <div className="stat-label">Pending Actions</div>
                    <div className="stat-value">{stats.pending}</div>
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '5px' }}> Requires attention</div>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
                    <div className="stat-label">Completed Visits</div>
                    <div className="stat-value">{stats.completed}</div>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}> Successful care</div>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#6366f1' }}>
                    <div className="stat-label">Today's Visits</div>
                    <div className="stat-value">{stats.today}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6366f1', marginTop: '5px' }}> Scheduled for today</div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Main: Recent Bookings Table */}
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={20} color="#64748b" /> Recent Incoming Bookings
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Service</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recent && stats.recent.map(b => (
                                <tr key={b.id}>
                                    <td style={{ fontWeight: 500 }}>{b.customer_name}</td>
                                    <td>{b.service_type}</td>
                                    <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                        {new Date(b.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Sidebar: Activity Feed */}
                <div className="activity-feed">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={20} color="#64748b" /> Live Activity
                    </h3>

                    {activity.map(log => (
                        <div key={log.id} className="feed-item">
                            <div className="feed-icon">
                                {log.action === 'new_booking' ? <Clock size={16} /> : <CheckCircle size={16} />}
                            </div>
                            <div className="feed-content">
                                <p><strong>{log.user_name || 'System'}</strong> {log.details}</p>
                                <div className="feed-time">{new Date(log.timestamp).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}

                    {activity.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center' }}>No recent activity</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
