import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';

const Hero = ({ t }) => {
    return (
        <section id="home" className="hero-section" style={{
            backgroundImage: `url('/hero.png')`, // Ensure this file exists in public/
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '90vh', // Slightly less than full screen to hint at more content
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
        }}>
            {/* Overlay for text readability - Stronger gradient for mobile readability */}
            <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to right, rgba(248, 250, 252, 0.95) 0%, rgba(248, 250, 252, 0.85) 50%, rgba(248, 250, 252, 0.4) 100%)'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 20px 60px' }}>
                <div style={{ maxWidth: '650px' }}>
                    <h1 className="animate-fade-in" style={{
                        color: 'var(--secondary)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        textShadow: '0 2px 4px rgba(255,255,255,0.5)'
                    }}>
                        {t.hero.heading}
                    </h1>
                    <p className="animate-fade-in" style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-main)',
                        marginBottom: '2rem',
                        animationDelay: '0.2s',
                        fontWeight: 500
                    }}>
                        {t.hero.subheading}
                    </p>

                    <div className="animate-fade-in" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        animationDelay: '0.4s'
                    }}>
                        {/* Using functional links for "Call Now" and "WhatsApp" are important for "client-ready" */}
                        <a href="tel:+94770000000" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                            <Phone size={20} /> {t.hero.callBtn}
                        </a>
                        <a href="https://wa.me/94770000000" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ textDecoration: 'none' }}>
                            <MessageCircle size={20} /> {t.hero.whatsappBtn}
                        </a>
                        <a href="#contact" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                            <Calendar size={20} /> {t.hero.bookBtn}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
