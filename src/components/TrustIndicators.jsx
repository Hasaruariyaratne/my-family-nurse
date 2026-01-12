import React from 'react';
import { Award, Stethoscope, ShieldCheck, Home } from 'lucide-react';

const iconMap = {
    Award,
    Stethoscope,
    ShieldCheck,
    Home
};

const TrustIndicators = ({ t }) => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--bg-body)' }}>
            <div className="container">
                <div className="grid-4" style={{ gap: '1.5rem' }}>
                    {t.trust.items.map((item, index) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <div key={index} className="card" style={{
                                textAlign: 'center',
                                padding: '2rem 1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div style={{
                                    color: 'var(--primary)',
                                    marginBottom: '1rem',
                                    background: '#e0f2fe',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '64px',
                                    height: '64px'
                                }}>
                                    <Icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 0, color: 'var(--secondary)' }}>{item.title}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustIndicators;
