import React, { useState } from 'react';
import { Send, Phone, MessageCircle } from 'lucide-react';

const Booking = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        address: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/bookings/public', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Thank you! Your booking request has been received. We will call you shortly to confirm.');
                setFormData({ name: '', phone: '', service: '', date: '', address: '', notes: '' });
            } else {
                alert('Connection error. Please call us directly.');
            }
        } catch (err) {
            console.error(err);
            alert('Connection error. Please call us directly.');
        }
    };

    return (
        <section id="contact" className="section" style={{ background: 'white' }}>
            <div className="container">
                <div className="grid-2">
                    {/* Copy & CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ textAlign: 'left', color: 'var(--primary)', marginBottom: '1rem' }}>{t.booking.title}</h2>
                        <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-light)' }}>
                            We are here to help you. Fill out the form or call us directly to schedule a visit.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <a href="tel:+94771234567" className="btn btn-primary" style={{ width: 'fit-content', padding: '15px 30px', fontSize: '1.2rem' }}>
                                <Phone size={24} /> {t.booking.call} : 077 123 4567
                            </a>
                            <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ width: 'fit-content', padding: '15px 30px', fontSize: '1.2rem' }}>
                                <MessageCircle size={24} /> {t.booking.whatsapp}
                            </a>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                            <h4 style={{ color: 'var(--secondary)' }}>Operating Hours</h4>
                            <p>24/7 Home Nursing Support</p>
                            <p>Office: 8:00 AM - 6:00 PM</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card" style={{ border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">{t.booking.name}</label>
                                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t.booking.phone}</label>
                                <input className="form-control" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t.booking.service}</label>
                                <select className="form-control" name="service" value={formData.service} onChange={handleChange} required>
                                    <option value="">Select Service / සේවාව තෝරන්න</option>
                                    <option value="IV Infusion">IV Infusion / Injection</option>
                                    <option value="Wound Care">Wound Care / තුවාල සත්කාර</option>
                                    <option value="Catheter">Catheter / Urine Bag</option>
                                    <option value="NG Tube">NG Tube Feeding</option>
                                    <option value="Elderly Care">General Elderly Care</option>
                                    <option value="Other">Other / වෙනත්</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t.booking.date}</label>
                                <input className="form-control" type="datetime-local" name="date" value={formData.date} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t.booking.address}</label>
                                <textarea className="form-control" rows="2" name="address" value={formData.address} onChange={handleChange} required></textarea>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t.booking.notes}</label>
                                <textarea className="form-control" rows="2" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                <Send size={18} /> {t.booking.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
