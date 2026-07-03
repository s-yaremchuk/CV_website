import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    name: 'JavaScript',
    descEn: 'The core of all my projects. Strong grasp of ES6+ features, async programming (Promises, async/await), the Event Loop, DOM API, and ES Modules. Applied across both browser environments (Ua Pomodoro — vanilla, no bundler) and Node.js runtime (Lab 7 Express API).',
    descUa: 'Основа всіх моїх проектів. Впевнене знання ES6+, асинхронного програмування (Promises, async/await), Event Loop, DOM API та ES Modules. Застосовано у браузерних середовищах (Ua Pomodoro — ванільний JS без збирача) та Node.js (Express API в Lab 7).',
    tags: ['ES6+', 'Async/Await', 'ES Modules', 'DOM API', 'Event Loop']
  },
  {
    name: 'React.js',
    descEn: 'Used across four projects (Lab 7–10) and this portfolio site. Comfortable with functional components, Hooks (useState, useEffect, useRef, useCallback, useMemo), React Router v6/v7, and Context API for global state management without third-party state libraries.',
    descUa: 'Використано в чотирьох проектах (Lab 7–10) та цьому сайті. Функціональні компоненти, хуки (useState, useEffect, useRef, useCallback, useMemo), React Router v6/v7, Context API для управління глобальним станом без сторонніх бібліотек.',
    tags: ['React 18/19', 'Hooks', 'Context API', 'React Router', 'JSX']
  },
  {
    name: 'Node.js & Express.js',
    descEn: 'Built a full REST API server from scratch in Lab 7: CRUD endpoints for inventory items, file upload handling with Multer (multipart/form-data, disk storage, automatic cleanup), and JSON file-based persistence. Practical experience with middleware, routing, and the request-response cycle.',
    descUa: 'Побудував повноцінний REST API сервер з нуля в Lab 7: CRUD-ендпоінти для товарів інвентарю, завантаження файлів через Multer (multipart/form-data, зберігання на диску, автоматичне видалення), JSON-файл як сховище. Практичний досвід з middleware, маршрутизацією та циклом запит-відповідь.',
    tags: ['Node.js', 'Express.js', 'REST API', 'Multer', 'Middleware']
  },
  {
    name: 'HTML & CSS',
    descEn: 'Semantic markup and modern CSS layout. Built complex visual components purely in CSS/JSX — including an interactive wagon seat map (Lab 10) with three visual states and class-specific geometry, and a Swiss-grid design system for Ua Pomodoro using CSS custom properties.',
    descUa: 'Семантична розмітка та сучасний CSS. Побудував складні візуальні компоненти на чистому CSS/JSX — інтерактивна схема вагона (Lab 10) з трьома станами та геометрією під клас, дизайн-система швейцарської сітки для Ua Pomodoro на CSS-змінних.',
    tags: ['CSS Grid', 'Flexbox', 'CSS Modules', 'CSS Variables', 'Responsive']
  },
  {
    name: 'Browser APIs & Web Platform',
    descEn: 'Direct experience with native browser APIs: Web Audio API (programmatic sound in Ua Pomodoro without audio files), Fetch API (Lab 8 — all HTTP calls without Axios), localStorage for persistent state across sessions (Lab 7–10), and PKCE OAuth 2.0 flow implemented from scratch for Spotify.',
    descUa: 'Прямий досвід з нативними браузерними API: Web Audio API (програмний звук без аудіофайлів), Fetch API (Lab 8 — всі HTTP-запити без Axios), localStorage для збереження стану між сесіями (Lab 7–10), PKCE OAuth 2.0 реалізований з нуля для Spotify.',
    tags: ['Web Audio API', 'Fetch API', 'localStorage', 'PKCE OAuth', 'Fullscreen API']
  },
  {
    name: 'Build Tools & Dev Workflow',
    descEn: 'Configured and used Vite across multiple React projects. Set up GitHub Actions CI/CD pipeline for automated builds and GitHub Pages deployment. Proficient in Git branching workflow, conventional commits, and managing multi-package repositories.',
    descUa: 'Налаштування та використання Vite у кількох React-проектах. Створення GitHub Actions CI/CD пайплайну для автоматичних збірок та деплою на GitHub Pages. Git-воркфлоу, описові коміти, робота з репозиторіями.',
    tags: ['Vite', 'GitHub Actions', 'CI/CD', 'Git', 'npm']
  },
  {
    name: 'Animation & Interaction',
    descEn: 'Implemented scroll-driven animations on this portfolio using GSAP + ScrollTrigger and smooth scrolling via Lenis. Built CSS-only micro-animations: seat pulse animation in Lab 10, staggered card reveals, slide-in Toast notifications, and hover effects across all projects.',
    descUa: 'Анімації на скрол цього сайту через GSAP + ScrollTrigger та плавний скрол через Lenis. CSS-мікроанімації: пульсація обраного місця (Lab 10), стaggered-поява карток, slide-in Toast-сповіщення, hover-ефекти в усіх проектах.',
    tags: ['GSAP', 'ScrollTrigger', 'Lenis', 'CSS Animations', 'Micro-interactions']
  },
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
