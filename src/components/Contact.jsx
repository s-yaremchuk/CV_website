import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Terminal, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-wrapper > *', {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      <h2 className="section-heading"><span>04.</span> {t.contactTitle}</h2>
      
      <div className="contact-wrapper">
        <p className="contact-text">
          {t.contactTitle === 'Contact' 
            ? 'Open for new opportunities. Feel free to contact me.' 
            : 'Відкритий до нових можливостей. Зв\'яжіться зі мною.'}
        </p>
        
        <div className="contact-links">
          <a href="mailto:syaremchukk@gmail.com" className="contact-link">
            <Mail size={20} />
            syaremchukk@gmail.com
          </a>
          <a href="tel:+380996281216" className="contact-link">
            <Phone size={20} />
            +380 99 628 1216
          </a>
          <a href="https://t.me/Seryare" target="_blank" rel="noopener noreferrer" className="contact-link">
            <Send size={20} />
            @Seryare
          </a>
          <a href="https://github.com/s-yaremchuk" target="_blank" rel="noopener noreferrer" className="contact-link">
            <Terminal size={20} />
            s-yaremchuk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
