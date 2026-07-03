import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import './styles/Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-name', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
      gsap.from('.hero-title', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });
      gsap.from('.hero-description', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-name">{t.name}</h1>
        <h2 className="hero-title">{t.title}</h2>
        <p className="hero-description">{t.description}</p>
        
        <div className="hero-cta-group">
          <button className="hero-btn primary" onClick={() => scrollTo('projects')}>
            {t.viewProjects}
          </button>
          <a href={`${import.meta.env.BASE_URL}Serhii_Yaremchuk_CV.pdf`} download="Serhii_Yaremchuk_CV.pdf" className="hero-btn secondary">
            {t.downloadCV}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
