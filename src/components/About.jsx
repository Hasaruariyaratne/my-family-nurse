import React from 'react';

const About = ({ t }) => {
    return (
        <section id="about" className="section" style={{ background: 'white' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--primary)' }}>{t.about.title}</h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-main)',
                        lineHeight: 1.8
                    }}>
                        {t.about.text}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
