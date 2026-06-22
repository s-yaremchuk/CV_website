import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const contactRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-container', {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mailto fallback
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:syaremchukk@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      <h2 className="section-heading"><span>04.</span> {t.contactTitle}</h2>
      
      <div className="contact-container">
        <div className="contact-info">
          <p className="contact-description">{t.contactDescription}</p>
          
          <div className="contact-details">
            <a href="tel:+380996281216" className="contact-item">
              <span>📱</span>
              <span>+380 99 628 1216</span>
            </a>
            <a href="https://t.me/Seryare" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span>✈️</span>
              <span>@Seryare</span>
            </a>
            <a href="mailto:syaremchukk@gmail.com" className="contact-item">
              <span>📧</span>
              <span>syaremchukk@gmail.com</span>
            </a>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/s-yaremchuk" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              GH
            </a>
            <a href="https://t.me/Seryare" target="_blank" rel="noopener noreferrer" className="social-link" title="Telegram">
              TG
            </a>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder={t.namePlaceholder} 
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder={t.emailPlaceholder} 
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message" 
              placeholder={t.messagePlaceholder} 
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="form-btn">
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
