import React, { useEffect, useState } from 'react';
import { Search, User } from 'lucide-react';

const Patients = ({ token }) => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch('/api/admin/patients', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setPatients(data));
    }, [token]);

    const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0, width: '300px', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#94a3b8' }} />
                    <input
                        className="form-control"
                        placeholder="Search patients..."
                        style={{ paddingLeft: '35px' }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Add New Patient</button>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* List */}
                <div>
                    {filtered.map(p => (
                        <div key={p.id} className="patient-card" onClick={() => setSelected(p)} style={{ cursor: 'pointer', borderColor: selected?.id === p.id ? 'var(--primary)' : '' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{p.name}</div>
                                <div style={{ color: '#64748b' }}>{p.phone}</div>
                            </div>
                            <User color="#cbd5e1" />
                        </div>
                    ))}
                </div>

                {/* Profile View */}
                <div className="card" style={{ height: 'fit-content' }}>
                    {selected ? (
                        <>
                            <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>{selected.name}</h2>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label className="form-label">Phone</label>
                                    <div>{selected.phone}</div>
                                </div>
                                <div>
                                    <label className="form-label">Address</label>
                                    <div>{selected.address}</div>
                                </div>
                                <div>
                                    <label className="form-label">Date of Birth</label>
                                    <div>{selected.dob || 'N/A'}</div>
                                </div>
                                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                    <label className="form-label">Medical Notes</label>
                                    <p style={{ fontSize: '0.9rem' }}>{selected.notes || 'No notes available.'}</p>
                                </div>

                                <button className="btn btn-outline" style={{ marginTop: '1rem' }}>View Visit History</button>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                            <User size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Select a patient to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Patients;
