import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';

const Bookings = ({ token, role }) => {
    const [bookings, setBookings] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = () => {
        fetch('/api/admin/bookings', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setBookings(data));
    };

    useEffect(() => {
        fetchBookings();
        if (role !== 'nurse') {
            fetch('/api/admin/nurses', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => setNurses(data));
        }
    }, [token, role]);

    const handleUpdate = async (id, status, nurse_id) => {
        await fetch(`/api/admin/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status, nurse_id })
        });
        fetchBookings();
        setSelectedBooking(null); // Close panel
    };

    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    return (
        <div>
            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#64748b' }}><Filter size={16} style={{ verticalAlign: 'middle' }} /> Filter:</span>
                {['all', 'new', 'confirmed', 'assigned', 'completed', 'cancelled'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'}`}
                        style={{ textTransform: 'capitalize', padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Patient</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Narrative</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(b => (
                            <tr key={b.id} onClick={() => setSelectedBooking(b)} style={{ cursor: 'pointer' }}>
                                <td>#{b.id}</td>
                                <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                                <td>
                                    <div>{b.customer_name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.customer_phone}</div>
                                </td>
                                <td>{b.service_type}</td>
                                <td>{new Date(b.scheduled_at).toLocaleDateString()}</td>
                                <td>{b.nurse_name || <span style={{ color: '#94a3b8' }}>Unassigned</span>}</td>
                                <td>
                                    <button className="btn btn-outline btn-sm">View details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Slide-over Detail Panel */}
            {selectedBooking && (
                <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
                    <div className="slide-over" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>Booking #{selectedBooking.id}</h2>
                            <button onClick={() => setSelectedBooking(null)} style={{ background: 'none' }}><X /></button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status Workflow</label>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {['new', 'confirmed', 'assigned', 'completed', 'cancelled'].map(s => (
                                    <button
                                        key={s}
                                        className={`btn btn-sm ${selectedBooking.status === s ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => handleUpdate(selectedBooking.id, s, selectedBooking.nurse_id)}
                                        disabled={role === 'nurse' && s !== 'completed'}
                                        style={{ textTransform: 'capitalize' }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ margin: '2rem 0', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Patient Details</h4>
                            <p><strong>Name:</strong> {selectedBooking.customer_name}</p>
                            <p><strong>Phone:</strong> {selectedBooking.customer_phone}</p>
                            <p><strong>Address:</strong> {selectedBooking.address}</p>
                            <p><strong>Notes:</strong> {selectedBooking.notes}</p>
                        </div>

                        {role !== 'nurse' && (
                            <div className="form-group">
                                <label className="form-label">Assign Nurse</label>
                                <select
                                    className="form-control"
                                    value={selectedBooking.nurse_id || ''}
                                    onChange={(e) => handleUpdate(selectedBooking.id, 'assigned', e.target.value)}
                                >
                                    <option value="">-- Select Nurse --</option>
                                    {nurses.map(n => (
                                        <option key={n.id} value={n.id}>{n.name} (Active)</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Internal Visit Notes</h4>
                            <textarea className="form-control" rows="4" placeholder="Add clinical notes here..."></textarea>
                            <button className="btn btn-primary" style={{ marginTop: '10px' }}>Save Note</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookings;
