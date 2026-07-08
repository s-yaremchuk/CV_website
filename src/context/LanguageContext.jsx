import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    greeting: '', // Removed
    name: 'Serhii Yaremchuk',
    title: 'JavaScript Developer',
    description: 'JavaScript Developer specializing in Front-end development with a strong focus on React SPAs, while actively developing my Back-end skills with Node.js and Express. Dedicated to writing clean code and shipping reliable products.',
    viewProjects: 'Projects',
    downloadCV: 'Download CV',
    aboutTitle: 'About & Education',
    aboutText: 'I am a JavaScript Developer focusing on Front-end development, while continuously expanding my Back-end expertise. I have strong practical experience building interactive React SPAs using modern tools like Context API and React Router. On the back-end side, I build REST APIs with Node.js and Express, handling file uploads and server-side persistence. I approach each project as an engineering challenge: choosing the right patterns, writing readable code, and delivering working solutions. Currently a 3rd-year Computer Science student at Ivan Franko National University, Lviv.',
    educationTitle: 'Education',
    educationDegree: 'Computer Science',
    educationUni: 'Ivan Franko National University',
    educationYear: '3rd Year Student',
    skillsTitle: 'Skills & Tech Stack',
    projectsTitle: 'Projects',
    contactTitle: 'Contact',
    footerText: '© 2025 Serhii Yaremchuk. All rights reserved.',
    builtWith: 'Built with React & GSAP'
  },
  ua: {
    greeting: '', // Removed
    name: 'Сергій Яремчук',
    title: 'JavaScript Developer',
    description: 'JavaScript Developer зі спеціалізацією на Front-end (React SPA), який активно розвивається у напрямку Back-end (Node.js/Express). Фокус на чистому коді та створенні надійних веб-застосунків.',
    viewProjects: 'Проєкти',
    downloadCV: 'Завантажити CV',
    aboutTitle: 'Про мене та Освіта',
    aboutText: 'Я JavaScript Developer, який фокусується на Front-end розробці, але також активно розвивається в напрямку Back-end. Маю сильний практичний досвід створення інтерактивних React SPA за допомогою сучасних інструментів, таких як Context API та React Router. На бекенді я будую REST API на Node.js та Express, реалізуючи завантаження файлів та серверне збереження даних. До кожного проекту підходжу як до інженерного завдання: вибираю правильні патерни, пишу читабельний код та доводжу до результату. Зараз — студент 3-го курсу факультету комп\'ютерних наук Університету ім. Івана Франка (Львів).',
    educationTitle: 'Освіта',
    educationDegree: 'Комп\'ютерні науки',
    educationUni: 'Університет ім. Івана Франка',
    educationYear: '3 курс',
    skillsTitle: 'Навички та Технології',
    projectsTitle: 'Проєкти',
    contactTitle: 'Контакти',
    footerText: '© 2025 Сергій Яремчук. Усі права захищені.',
    builtWith: 'Зроблено з React та GSAP'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ua');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ua' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
