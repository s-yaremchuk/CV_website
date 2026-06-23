import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { 
    name: 'JavaScript / Node.js', 
    descEn: 'Deep understanding of Event Loop, asynchronous programming (Promises, async/await), and DOM API. Experience building RESTful APIs with Express, handling file systems, and working with data streams.',
    descUa: 'Глибоке розуміння Event Loop, асинхронного програмування (Promises, async/await) та DOM API. Досвід створення RESTful API за допомогою Express, роботи з файловою системою та потоками даних.',
    tags: ['ES6+', 'Express.js', 'Async/Await', 'REST'] 
  },
  { 
    name: 'HTML & CSS', 
    descEn: 'Semantic markup, accessibility standards, and SEO best practices. Proficient in modern CSS layout techniques including Flexbox, Grid, CSS Variables, and responsive design without relying on heavy frameworks.',
    descUa: 'Семантична розмітка, стандарти доступності (a11y) та базове SEO. Володіння сучасними методами верстки: Flexbox, Grid, CSS Variables та створення адаптивного дизайну без важких фреймворків.',
    tags: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive'] 
  },
  { 
    name: 'React.js', 
    descEn: 'Building interactive user interfaces using functional components and Hooks. State management, component lifecycle, and integrating with external APIs.',
    descUa: 'Створення інтерактивних користувацьких інтерфейсів за допомогою функціональних компонентів та Хуків. Управління станом та інтеграція зі сторонніми API.',
    tags: ['Hooks', 'Context API', 'Vite', 'GSAP'] 
  },
  { 
    name: 'Databases & SQL', 
    descEn: 'Designing relational database schemas, writing complex queries, and understanding basic optimization techniques using PostgreSQL.',
    descUa: 'Проєктування схем реляційних баз даних, написання складних запитів та розуміння базових технік оптимізації за допомогою PostgreSQL.',
    tags: ['PostgreSQL', 'SQL', 'Schema Design'] 
  },
  { 
    name: 'Version Control', 
    descEn: 'Proficient in Git workflow: branching, merging, resolving conflicts, and managing code repositories on GitHub.',
    descUa: 'Впевнене володіння Git: розгалуження, злиття, вирішення конфліктів та управління репозиторіями на GitHub.',
    tags: ['Git', 'GitHub', 'Workflow'] 
  }
];

const Skills = () => {
  const { t, lang } = useLanguage();
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-item', {
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={skillsRef}>
      <h2 className="section-heading" data-num="02"><span>02.</span> {t.skillsTitle}</h2>
      
      <div className="skills-list">
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-item">
            <div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
            <div>
              <p className="skill-details">{lang === 'en' ? skill.descEn : skill.descUa}</p>
              <div className="skill-tags">
                {skill.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
