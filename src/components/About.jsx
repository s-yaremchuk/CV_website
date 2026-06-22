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
      gsap.from('.about-grid > div', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      <h2 className="section-heading"><span>01.</span> {t.aboutTitle}</h2>
      
      <div className="about-grid">
        <div className="about-text">
          <p>{t.aboutText}</p>
        </div>
        
        <div className="education-block">
          <h3 className="education-title">{t.educationTitle}</h3>
          <div className="education-item">
            <strong>{t.educationDegree}</strong>
            <span>{t.educationUni}</span>
            <span className="year">{t.educationYear}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
