import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './styles/Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">SY.</div>
        
        <div className="footer__links">
          <a href="https://github.com/s-yaremchuk" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
          <a href="https://t.me/Seryare" target="_blank" rel="noopener noreferrer" className="footer__link">Telegram</a>
        </div>
        
        <p className="footer__built-with">
          {t.builtWith.split('React & GSAP')[0]}
          <span>React & GSAP</span>
          {t.builtWith.split('React & GSAP')[1]}
        </p>
        
        <p className="footer__copyright">{t.footerText}</p>
        
        <button onClick={scrollToTop} className="footer__back-to-top" aria-label="Back to top">
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
