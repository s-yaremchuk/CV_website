import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import './styles/Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-greeting', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-name', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-title', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 1
      }, '-=0.2');

    }, heroRef);

    return () => ctx.revert();
  }, [t]); // Re-run animation if language changes just to be safe, or we can omit it

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-background"></div>
      
      {/* Particles */}
      <div className="particle" style={{top: '20%', left: '10%'}}></div>
      <div className="particle" style={{top: '80%', left: '15%', animationDelay: '2s'}}></div>
      <div className="particle" style={{top: '40%', left: '80%', animationDelay: '1s'}}></div>
      <div className="particle" style={{top: '70%', left: '70%', animationDelay: '3s'}}></div>

      <div className="hero-content">
        <p className="hero-greeting">&gt; {t.greeting}</p>
        <h1 className="hero-name">{t.name}</h1>
        <h2 className="hero-title">{t.title}</h2>
        <p className="hero-description">{t.description}</p>
        
        <div className="hero-cta-group">
          <button className="hero-btn primary" onClick={() => scrollTo('projects')}>
            {t.viewProjects}
          </button>
          <a href="#" className="hero-btn secondary">
            {t.downloadCV}
          </a>
        </div>
      </div>
      
      <div className="hero-scroll-indicator" onClick={() => scrollTo('about')}>
        ↓
      </div>
    </section>
  );
};

export default Hero;
