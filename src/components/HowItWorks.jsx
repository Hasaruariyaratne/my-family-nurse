import React from 'react';
import { Phone, CalendarCheck, UserCheck } from 'lucide-react';

const icons = [Phone, CalendarCheck, UserCheck];

const HowItWorks = ({ t }) => {
    return (
        <section className="section" style={{ background: 'white' }}>
            <div className="container">
                <h2 style={{ color: 'var(--primary)' }}>{t.howItWorks.title}</h2>
                <div className="grid-3" style={{ position: 'relative' }}>
                    {/* Steps */}
                    {t.howItWorks.steps.map((step, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                                <div style={{
                                    width: '80px', height: '80px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: '0 4px 10px rgba(14, 116, 144, 0.4)'
                                }}>
                                    <Icon size={36} />
                                </div>
                                <div style={{
                                    width: '30px', height: '30px',
                                    background: 'var(--secondary)', color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '-10px auto 10px',
                                    fontWeight: 'bold',
                                    border: '2px solid white',
                                    transform: 'translateY(-25px)'
                                }}>
                                    {index + 1}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-light)' }}>{step.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
