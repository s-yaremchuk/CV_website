import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    greeting: '', // Removed
    name: 'Serhii Yaremchuk',
    title: 'Junior Backend Developer',
    description: 'Junior web developer with a desire to grow in backend development. I aim to work with server-side logic and databases. Also improving frontend skills (React). Currently expanding my skillset. Have some experience working with AI.',
    viewProjects: 'Projects',
    downloadCV: 'Download CV',
    aboutTitle: 'About & Education',
    aboutText: 'Junior web developer with a desire to grow in backend development. I aim to work with server-side logic and databases. Also improving frontend skills (React). Currently expanding my skillset. Have some experience working with AI.',
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
    title: 'Junior Backend Розробник',
    description: 'Початківець web developer з бажанням розвиватися в бек енд напрямку. Хотів би працювати з з серверною логікою та базами даних. Також покращую навички в Front end (React). Наразі розширюю свої навчики. Є певні навички роботи AI.',
    viewProjects: 'Проєкти',
    downloadCV: 'Завантажити CV',
    aboutTitle: 'Про мене та Освіта',
    aboutText: 'Початківець web developer з бажанням розвиватися в бек енд напрямку. Хотів би працювати з з серверною логікою та базами даних. Також покращую навички в Front end (React). Наразі розширюю свої навчики. Є певні навички роботи AI.',
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
