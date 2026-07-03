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
    aboutText: 'I am a Junior Web Developer actively pursuing a career in backend engineering. My core interest lies in designing server-side logic, managing databases, and building scalable APIs. Alongside my backend focus, I am enhancing my frontend capabilities using React and exploring practical applications of AI in development. My goal is to continuously expand my technical stack and deliver robust engineering solutions.',
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
    aboutText: 'Я початківець Web Developer, який цілеспрямовано розвивається в напрямку backend-інженерії. Мої основні інтереси — це проектування серверної логіки, робота з базами даних та створення надійних API. Крім бекенду, я активно вдосконалюю свої навички у frontend-розробці за допомогою React та інтегрую інструменти штучного інтелекту у свій робочий процес. Моя мета — постійне розширення технічного стеку та робота над складними інженерними завданнями.',
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
