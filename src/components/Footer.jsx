import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 30px' }}>
            <div className="container">
                <div className="grid-3" style={{ alignItems: 'start', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    {/* Brand */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '10px', marginBottom: '20px', color: 'white' }}>
                            Visiting Nurse
                        </h3>
                        <p style={{ opacity: 0.8, maxWidth: '300px', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Providing compassion, comfort, and professional care in the safety of your home.
                        </p>
                    </div>

                    {/* Contact */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <a href="tel:+94771234567" style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.9 }}>
                                <Phone size={18} style={{ color: 'var(--primary)' }} /> 077 123 4567
                            </a>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.9 }}>
                                <Mail size={18} style={{ color: 'var(--primary)' }} /> info@visitingnurse.lk
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: 0.9 }}>
                                <MapPin size={18} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                                <span>No. 123, Main Road,<br />Battaramulla.</span>
                            </div>
                        </div>
                    </div>

                    {/* Legal & Emergency */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid #ef4444',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>
                                EMERGENCY?
                            </p>
                            <p style={{ color: 'white', fontSize: '0.95rem' }}>
                                {t.footer.disclaimer}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', opacity: 0.7 }}>
                            <a href="#">{t.footer.privacy}</a>
                            <a href="#">{t.footer.terms}</a>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '20px', paddingTop: '20px', textAlign: 'center', fontSize: '0.85rem', opacity: 0.5 }}>
                    © {new Date().getFullYear()} Visiting Nurse Home Care Service. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
