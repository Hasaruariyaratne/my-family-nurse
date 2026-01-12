import React from 'react';
import { MapPin } from 'lucide-react';

const Areas = ({ t }) => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'white', marginBottom: '2rem' }}>{t.areas.title}</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {t.areas.locations.map((area, index) => (
                        <div key={index} style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '1.1rem',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <MapPin size={18} /> {area}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Areas;
