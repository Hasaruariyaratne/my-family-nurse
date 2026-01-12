import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Areas from './components/Areas';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { content } from './content';
import { Phone, MessageCircle } from 'lucide-react';

function App() {
  const [lang, setLang] = useState('en');

  // Update body class and title for font/language switching
  useEffect(() => {
    document.body.className = lang === 'si' ? 'lang-si' : '';
    document.title = lang === 'si' ? 'Visiting Nurse - ගෘහස්ථ හෙද සේවාව' : 'Visiting Nurse - Home Nursing Service';
  }, [lang]);

  const t = content[lang];

  return (
    <div className="App">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero t={t} />
        <TrustIndicators t={t} />
        <About t={t} />
        <Services t={t} />
        <HowItWorks t={t} />
        <Areas t={t} />
        <Booking t={t} />
        <FAQ t={t} />
      </main>

      <Footer t={t} />

      {/* Mobile Sticky Bar (Visible only on mobile via CSS) */}
      <div className="mobile-sticky-bar" style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
        <a href="tel:+94771234567" className="btn" style={{ background: 'var(--primary)', color: 'white', textDecoration: 'none', justifyContent: 'center', boxShadow: '0 2px 5px rgba(14, 116, 144, 0.3)' }}>
          <Phone size={18} /> Call Now
        </a>
        <a href="https://wa.me/94771234567" className="btn" style={{ background: '#25D366', color: 'white', textDecoration: 'none', justifyContent: 'center', boxShadow: '0 2px 5px rgba(37, 211, 102, 0.3)' }}>
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default App;
