import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = ({ t }) => {
    const [openIndex, setOpenIndex] = useState(0); // Open first one by default

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section" style={{ backgroundColor: '#f8fafc' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <HelpCircle size={32} /> {t.faq.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {t.faq.items.map((item, index) => (
                        <div key={index} style={{
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                            border: openIndex === index ? '1px solid var(--primary)' : '1px solid transparent',
                            transition: 'all 0.3s'
                        }}>
                            <div
                                onClick={() => toggle(index)}
                                style={{
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    color: openIndex === index ? 'var(--primary)' : 'var(--secondary)'
                                }}
                            >
                                <span>{item.q}</span>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            {openIndex === index && (
                                <div style={{
                                    padding: '0 20px 20px',
                                    color: 'var(--text-light)',
                                    lineHeight: 1.6,
                                    animation: 'fadeIn 0.3s'
                                }}>
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
