import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: '.about-cards',
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      <h2 className="section-heading"><span>01.</span> {t.aboutTitle}</h2>
      
      <div className="about-content">
        <div className="about-text">
          <p>{t.aboutText}</p>
        </div>
        
        <div className="about-cards">
          <div className="about-card">
            <div className="about-card__icon">📍</div>
            <div className="about-card__info">
              <span className="about-card__label">{t.location}</span>
              <span className="about-card__value">{t.locationValue}</span>
            </div>
          </div>
          
          <div className="about-card">
            <div className="about-card__icon">💼</div>
            <div className="about-card__info">
              <span className="about-card__label">{t.focus}</span>
              <span className="about-card__value">{t.focusValue}</span>
            </div>
          </div>
          
          <div className="about-card">
            <div className="about-card__icon">🎓</div>
            <div className="about-card__info">
              <span className="about-card__label">{t.level}</span>
              <span className="about-card__value">{t.levelValue}</span>
            </div>
          </div>
          
          <div className="about-card">
            <div className="about-card__icon">🚀</div>
            <div className="about-card__info">
              <span className="about-card__label">{t.goal}</span>
              <span className="about-card__value">{t.goalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
