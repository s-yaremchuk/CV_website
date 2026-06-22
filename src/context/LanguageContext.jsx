import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    greeting: 'Hello, I am',
    name: 'Serhii Yaremchuk',
    title: 'Junior Backend Developer',
    description: 'Passionate about building robust server-side solutions. Focused on JavaScript, APIs, and web technologies.',
    viewProjects: 'View Projects',
    downloadCV: 'Download CV',
    aboutTitle: 'About Me',
    aboutText: 'I am a junior backend developer with a strong foundation in JavaScript and web technologies. I enjoy building APIs, working with databases, and creating efficient server-side logic. Currently expanding my skills in React and modern frontend practices.',
    skillsTitle: 'My Skills',
    projectsTitle: 'Projects',
    contactTitle: 'Get In Touch',
    contactDescription: 'Have a project in mind or want to collaborate? Feel free to reach out!',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'Your Message',
    send: 'Send Message',
    sending: 'Sending...',
    sent: 'Message Sent!',
    footerText: '© 2025 Serhii Yaremchuk. All rights reserved.',
    builtWith: 'Built with React & GSAP',
    location: 'Location',
    locationValue: 'Ukraine',
    focus: 'Focus',
    focusValue: 'Backend Development',
    level: 'Level',
    levelValue: 'Junior / Trainee',
    goal: 'Goal',
    goalValue: 'Full-Stack Developer'
  },
  ua: {
    greeting: 'Привіт, я',
    name: 'Сергій Яремчук',
    title: 'Junior Backend Розробник',
    description: 'Захоплююся створенням надійних серверних рішень. Фокус на JavaScript, API та веб-технологіях.',
    viewProjects: 'Мої Проєкти',
    downloadCV: 'Завантажити CV',
    aboutTitle: 'Про мене',
    aboutText: 'Я початківець бекенд-розробник з міцною базою в JavaScript та веб-технологіях. Мені подобається створювати API, працювати з базами даних та писати ефективну серверну логіку. Наразі розширюю свої навички в React та сучасних фронтенд-практиках.',
    skillsTitle: 'Мої Навички',
    projectsTitle: 'Проєкти',
    contactTitle: 'Зв\\'язатися',
    contactDescription: 'Маєте проєкт або хочете співпрацювати? Не соромтеся написати!',
    namePlaceholder: 'Ваше ім\\'я',
    emailPlaceholder: 'Ваш Email',
    messagePlaceholder: 'Ваше повідомлення',
    send: 'Надіслати',
    sending: 'Надсилаю...',
    sent: 'Надіслано!',
    footerText: '© 2025 Сергій Яремчук. Усі права захищені.',
    builtWith: 'Зроблено з React та GSAP',
    location: 'Локація',
    locationValue: 'Україна',
    focus: 'Фокус',
    focusValue: 'Backend Розробка',
    level: 'Рівень',
    levelValue: 'Junior / Trainee',
    goal: 'Мета',
    goalValue: 'Full-Stack Розробник'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ua'); // Default to Ukrainian

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
