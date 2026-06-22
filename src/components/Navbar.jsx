import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#" className="navbar__logo">SY.</a>
      
      <div className="navbar__controls">
        <div className="navbar__links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="navbar__link">
            {lang === 'en' ? 'About' : 'Про мене'}
          </a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }} className="navbar__link">
            {lang === 'en' ? 'Skills' : 'Навички'}
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="navbar__link">
            {lang === 'en' ? 'Projects' : 'Проєкти'}
          </a>
        </div>
        
        <button onClick={toggleLanguage} className="navbar__lang-toggle">
          {lang === 'en' ? 'UA' : 'EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
