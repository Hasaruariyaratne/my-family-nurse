import React from 'react';
import { Activity, Droplet, Heart, Wind, Thermometer, UserCog, Stethoscope, Syringe, Footprints } from 'lucide-react';

const Services = ({ t }) => {
    // Mapping icons based on keywords in English name (simple heuristic or manual map)
    // Actually, since the array order is fixed, I can map by index manually or just use a generic icon if index mismatch.
    const icons = [
        Syringe, // IV
        Wind, // Tracheostomy
        Droplet, // Blood
        Activity, // NG Tube
        Heart, // BP
        Wind, // Nebulisation
        Stethoscope, // Wound
        Footprints, // Foot
        UserCog // Stoma
    ];

    return (
        <section id="services" className="section" style={{ backgroundColor: '#f0f9ff' }}>
            <div className="container">
                <h2 style={{ color: 'var(--primary-light)', marginBottom: '3rem' }}>{t.services.title}</h2>
                <div className="grid-3" style={{ rowGap: '2rem' }}>
                    {t.services.items.map((service, index) => {
                        const Icon = icons[index] || Activity;
                        return (
                            <div key={index} className="card" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                height: '100%',
                                borderTop: '4px solid var(--primary)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: 'white',
                                    color: 'var(--primary)',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1rem',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                }}>
                                    <Icon size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--secondary)' }}>{service.name}</h3>
                                <p style={{ color: 'var(--text-light)', flexGrow: 1, fontSize: '0.95rem' }}>{service.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
