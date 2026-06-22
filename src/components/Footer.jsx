import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './styles/Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">{t.footerText}</p>
        <p className="footer__built-with">{t.builtWith}</p>
      </div>
    </footer>
  );
};

export default Footer;
