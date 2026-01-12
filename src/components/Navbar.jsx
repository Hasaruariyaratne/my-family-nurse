import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = ({ lang, setLang, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                padding: scrolled ? '10px 0' : '20px 0',
                transition: 'all 0.3s ease'
            }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <div
                    className="logo"
                    onClick={() => scrollToSection('home')}
                    style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        VN
                    </div>
                    <span>Visiting Nurse</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex" style={{ display: 'none' }}>
                    {/* Using media query in style is hard inline, so I'll rely on global css media queries or just use a className that I defined in index.css? 
             I didn't define utility classes for hiding. I should stick to standard CSS in a style tag or index.css.
             I will add a class 'desktop-menu' and 'mobile-menu-btn' to index.css or just style here with window width? 
             No, CSS media queries are best. 
          */}
                </div>

                {/* We need CSS classes for responsiveness since I am not using Tailwind (per instructions unless requested). 
           I will add responsive classes to index.css later or now?
           I will use inline styles with media queries in a <style> block inside this component? No, that's messy.
           I'll rely on the classes I can add to index.css.
           Wait, I am supposed to "Build the components".
           I will add the responsive styles to `index.css` in a later step or assume I can use `className="desktop-nav"` and define it.
           I'll define `desktop-nav` in `index.css` via a `multi_replace` later or just write it now properly.
           Actually, I'll write the JSX structure and then update `index.css` to handle the `desktop-nav` vs `mobile-nav` display.
        */}

                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <ul className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                        <li onClick={() => scrollToSection('home')} style={{ cursor: 'pointer', fontWeight: 500 }}>{t.nav.home}</li>
                        <li onClick={() => scrollToSection('services')} style={{ cursor: 'pointer', fontWeight: 500 }}>{t.nav.services}</li>
                        <li onClick={() => scrollToSection('about')} style={{ cursor: 'pointer', fontWeight: 500 }}>{t.nav.about}</li>
                        <li onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer', fontWeight: 500 }}>{t.nav.contact}</li>
                    </ul>

                    <div className="lang-toggle">
                        <div className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</div>
                        <div className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිං</div>
                    </div>

                    <button className="btn btn-primary" onClick={() => scrollToSection('contact')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                        <Phone size={18} /> {t.booking.call}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-toggle" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none' }}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: 'white', padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'
                }}>
                    <div onClick={() => scrollToSection('home')} style={{ fontSize: '1.2rem' }}>{t.nav.home}</div>
                    <div onClick={() => scrollToSection('services')} style={{ fontSize: '1.2rem' }}>{t.nav.services}</div>
                    <div onClick={() => scrollToSection('about')} style={{ fontSize: '1.2rem' }}>{t.nav.about}</div>
                    <div onClick={() => scrollToSection('contact')} style={{ fontSize: '1.2rem' }}>{t.nav.contact}</div>

                    <div className="lang-toggle" style={{ marginTop: '1rem' }}>
                        <div className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</div>
                        <div className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
