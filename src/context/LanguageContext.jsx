import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    greeting: '', // Removed
    name: 'Serhii Yaremchuk',
    title: 'JavaScript Developer',
    description: 'JavaScript Developer with hands-on experience building full-stack web applications. From REST APIs with Node.js/Express to interactive React SPAs — focused on writing clean, maintainable code and shipping working products.',
    viewProjects: 'Projects',
    downloadCV: 'Download CV',
    aboutTitle: 'About & Education',
    aboutText: 'I am a JavaScript Developer with practical experience across the full web stack. I have built REST APIs with Node.js and Express, managed file uploads and persistence on the server side, and implemented multi-page React SPAs with Context API, React Router, and localStorage-based state. I approach each project as an engineering problem: choosing the right patterns, writing readable code, and shipping a working result. Currently a 3rd-year Computer Science student at Ivan Franko National University, Lviv.',
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
    description: 'JavaScript Developer з практичним досвідом побудови full-stack веб-застосунків. Від REST API на Node.js/Express до інтерактивних React SPA — фокус на чистому коді та робочих продуктах.',
    viewProjects: 'Проєкти',
    downloadCV: 'Завантажити CV',
    aboutTitle: 'Про мене та Освіта',
    aboutText: 'Я JavaScript Developer з практичним досвідом на обох сторонах веб-стеку. Будував REST API на Node.js та Express, реалізовував завантаження файлів та серверне збереження даних, писав багатосторінкові React SPA з Context API, React Router та localStorage. До кожного проекту підходжу як до інженерного завдання: вибираю правильні патерни, пишу читабельний код, доводжу до робочого результату. Зараз — студент 3-го курсу факультету комп\'ютерних наук Університету ім. Івана Франка (Львів).',
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
