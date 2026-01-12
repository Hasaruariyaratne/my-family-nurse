import React, { useEffect, useState } from 'react';
import { UserCheck, Phone, ToggleLeft, ToggleRight } from 'lucide-react';

const Nurses = ({ token }) => {
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        fetch('/api/admin/nurses', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setNurses(data));
    }, [token]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button className="btn btn-primary">Register New Nurse</button>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {nurses.map(nurse => (
                    <div key={nurse.id} className="card" style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                        <div style={{
                            width: '50px', height: '50px',
                            background: '#e0e7ff', color: '#4338ca',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.2rem', fontWeight: 'bold'
                        }}>
                            {nurse.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{nurse.name}</h3>
                                {nurse.is_active ? <ToggleRight color="#10b981" /> : <ToggleLeft color="#94a3b8" />}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '10px' }}>
                                <Phone size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                {nurse.phone}
                            </div>

                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <span className="badge badge-new" style={{ fontSize: '0.7rem' }}>IV Certified</span>
                                <span className="badge badge-new" style={{ fontSize: '0.7rem' }}>Wound Care</span>
                            </div>

                            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>View Performance</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nurses;
