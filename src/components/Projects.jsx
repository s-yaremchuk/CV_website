import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Curated project data extracted from README files ─────────────────────────
const PROJECTS = [
  {
    id: 'ukrzaliznytsia',
    name: 'Ukrzaliznytsia Booking System',
    url: 'https://github.com/s-yaremchuk/WEB-project-Modul2',
    language: 'JavaScript',
    tags: ['React 19', 'React Router v7', 'Context API', 'Vite', 'CSS Modules', 'localStorage'],
    summaryEn: 'Capstone SPA that simulates an end-to-end train ticket booking experience modelled after Ukraine\'s national railway operator. Covers the full user journey — route search, wagon selection, interactive seat map, passenger validation, and booking persistence.',
    summaryUa: 'Повноцінний SPA, що симулює процес купівлі залізничних квитків у стилі Укрзалізниці. Охоплює весь шлях користувача: пошук маршруту, вибір вагона, інтерактивна карта місць, валідація пасажирів та збереження бронювань.',
    featuresEn: [
      'Route search & filtering by city, train number, and date',
      '8 pre-loaded realistic routes with wagon manifests',
      'Interactive wagon floorplan (Плацкарт / Купе / СВ) built entirely in JSX/CSS',
      'Three-state seat colouring: Available, Selected (pulse animation), Occupied',
      'Passenger form with regex validation (name, phone +380, email)',
      'Booking persistence via localStorage — booked seats survive page refresh',
      'Animated Toast notifications for success/error feedback',
    ],
    featuresUa: [
      'Пошук та фільтрація маршрутів за містом, номером поїзда і датою',
      '8 реалістичних маршрутів з детальними даними по вагонах',
      'Інтерактивна схема вагона (Плацкарт / Купе / СВ) на JSX/CSS',
      'Три стани місць: Вільне, Обране (анімація), Заброньоване',
      'Форма пасажира з regex-валідацією (ім\'я, телефон +380, email)',
      'Збереження бронювань у localStorage — стан зберігається між сесіями',
      'Анімовані Toast-сповіщення про результат бронювання',
    ],
    archEn: 'Clean client-server separation using React Router v7 with BrowserRouter. Global state managed via Context API (BookingContext + useBooking hook). Data layer abstracted into BookingService for localStorage CRUD, keeping components free of persistence logic.',
    archUa: 'Чіткий поділ на маршрути через React Router v7 (BrowserRouter). Глобальний стан через Context API (BookingContext + useBooking). Логіка збереження винесена до BookingService, що тримає компоненти чистими.',
  },
  {
    id: 'pomodoro',
    name: 'UA Pomodoro — Swiss Focus Timer',
    url: 'https://github.com/s-yaremchuk/Ua_pomodoro',
    language: 'JavaScript',
    tags: ['Vanilla JS', 'Spotify Web Playback SDK', 'Web Audio API', 'PKCE OAuth', 'ES Modules', 'localStorage'],
    summaryEn: 'A Swiss International-style Pomodoro focus timer with full Spotify Web Playback SDK integration. Manages work/break intervals with keyboard shortcuts and persists user settings across sessions. Designed as a pure ES Module project with no bundler dependency.',
    summaryUa: 'Pomodoro-таймер у стилі швейцарського конструктивізму з повноцінною інтеграцією Spotify Web Playback SDK. Керує робочими/відпочинковими інтервалами, підтримує клавіатурні скорочення та зберігає налаштування. Чистий ES Module проект без збирача.',
    featuresEn: [
      'Three timer modes: Focus (25 min), Short Break (5 min), Long Break (15 min)',
      'Full Spotify SDK player: Play/Pause, Next, Previous track controls',
      'PKCE OAuth 2.0 flow for Spotify authentication (no backend required)',
      'Keyboard shortcuts: Space, R (reset), F (fullscreen), ←/→ (tracks)',
      'Sound alert via Web Audio API — no audio files needed',
      'Settings persistence via localStorage (durations, auth state)',
      'Fullscreen mode (button + keyboard)',
    ],
    featuresUa: [
      'Три режими: Фокус (25 хв), Коротка пауза (5 хв), Довга пауза (15 хв)',
      'Повноцінний Spotify SDK плеєр: Play/Pause, Наступний, Попередній трек',
      'PKCE OAuth 2.0 авторизація Spotify без серверної частини',
      'Клавіатурні скорочення: Пробіл, R (скидання), F (повний екран), ←/→',
      'Звуковий сигнал через Web Audio API без аудіофайлів',
      'Збереження налаштувань у localStorage (тривалість, авторизація)',
      'Режим повного екрану (кнопка + клавіша)',
    ],
    archEn: 'Modular vanilla JS split into focused files: app.js (UI + keyboard events), timer.js (Pomodoro Timer class + Web Audio), spotify.js (SDK init + PKCE token flow). Swiss grid design system defined in CSS custom properties.',
    archUa: 'Модульний ванільний JS розбитий на файли: app.js (UI + клавіші), timer.js (клас таймера + Web Audio), spotify.js (ініціалізація SDK + PKCE). Дизайн-система на CSS-змінних у швейцарській сітці.',
  },
  {
    id: 'inventory',
    name: 'Inventory Admin — CRUD Management System',
    url: 'https://github.com/s-yaremchuk/web-frontend-Lab7',
    language: 'JavaScript',
    tags: ['React 18', 'Node.js', 'Express.js', 'Multer', 'Axios', 'React Router v6', 'CSS Modules'],
    summaryEn: 'Full-stack inventory management application with image upload support. Provides a complete admin interface for CRUD operations on inventory items, with photos stored on the server filesystem and metadata persisted in a JSON-based datastore.',
    summaryUa: 'Full-stack застосунок управління інвентарем з підтримкою завантаження зображень. Повноцінний адмін-інтерфейс для CRUD-операцій над товарами — фото зберігаються на файловій системі сервера, метадані у JSON-файлі.',
    featuresEn: [
      'Full CRUD operations via RESTful API (create, read, update, delete)',
      'Image upload via multipart/form-data, stored on disk with Multer',
      'Automatic cleanup of old photos on item deletion or replacement',
      'Separate text and photo update flows to prevent accidental data loss',
      'Confirmation modal for destructive delete actions',
      'Global state via Context API with useCallback/useMemo optimisation',
      'Client-side routing: List, Create, Details, Edit pages (React Router v6)',
    ],
    featuresUa: [
      'Повний CRUD через RESTful API (створення, читання, оновлення, видалення)',
      'Завантаження фото через multipart/form-data з Multer, зберігання на диску',
      'Автоматичне видалення старих фото при заміні або видаленні товару',
      'Окремі форми для тексту та фото — запобігає випадковій втраті даних',
      'Модальне підтвердження для деструктивних операцій видалення',
      'Глобальний стан через Context API з useCallback/useMemo',
      'Маршрутизація: List, Create, Details, Edit (React Router v6)',
    ],
    archEn: 'Classic client-server monorepo. Frontend: React + Axios + CSS Modules. Backend: Express.js REST API with Multer for file uploads. All HTTP calls isolated in inventoryApi.js service layer. Inventory state managed in InventoryContext with lazy loading.',
    archUa: 'Класична клієнт-серверна монорепа. Фронтенд: React + Axios + CSS Modules. Бекенд: Express.js REST API з Multer. Всі HTTP-виклики ізольовані в inventoryApi.js. Стан інвентарю у InventoryContext з ледачим завантаженням.',
  },
  {
    id: 'lab10',
    name: 'Ukrzaliznytsia — Interactive Seat Selection SPA',
    url: 'https://github.com/s-yaremchuk/web-frontend-Lab10',
    language: 'JavaScript',
    tags: ['React 19', 'Context API', 'React Router v7', 'localStorage', 'CSS Modules', 'Vite'],
    summaryEn: 'React SPA extending a train search into a full ticket booking flow. The key challenge was building an interactive, class-aware wagon seat map entirely in CSS/JSX, coordinating multi-step state across components via Context API, and implementing regex-based form validation with real-time feedback.',
    summaryUa: 'React SPA, що розширює пошук поїздів до повного процесу бронювання квитків. Ключовий виклик — побудова інтерактивної схеми вагона на CSS/JSX, координація багатокрокового стану через Context API та валідація форм з regex у реальному часі.',
    featuresEn: [
      'Wagon class selector: Плацкарт (54 seats), Купе (36 seats), СВ (18 seats)',
      'Visual seat map with conductor cabin, corridor, toilets rendered in JSX',
      'Three-state seats: Available / Selected / Occupied (from localStorage)',
      'Passenger form: name, phone (+380 regex), email with blur-triggered errors',
      'Submit disabled until seat selected and all fields valid',
      'Booking persistence to localStorage; booked seats immediately turn red',
      'Slide-in animated Toast auto-dismissed after 3 seconds',
    ],
    featuresUa: [
      'Вибір класу вагона: Плацкарт (54 місця), Купе (36), СВ (18)',
      'Візуальна схема вагона з купе провідника, коридором та туалетами',
      'Три стани місць: Вільне / Обране / Заброньоване (із localStorage)',
      'Форма пасажира: ім\'я, телефон (regex +380), email з помилками на blur',
      'Кнопка відправки заблокована до вибору місця та заповнення полів',
      'Збереження в localStorage; заброньовані місця одразу стають червоними',
      'Slide-in Toast з авто-закриттям через 3 секунди',
    ],
    archEn: 'SPA with two routes: Home (/) for search/filtering and Booking (/booking/:trainId) for the seat+form flow. BookingContext carries selectedTrain across route boundaries without re-fetching. BookingService abstracts all localStorage I/O.',
    archUa: 'SPA з двома маршрутами: Home (/) для пошуку та Booking (/booking/:trainId) для місць та форми. BookingContext передає selectedTrain між маршрутами без повторних запитів. BookingService ізолює всю роботу з localStorage.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Projects = () => {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-card',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.projects-list',
            start: 'top 82%',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        }
      );
    }, projectsRef);
    return () => ctx.revert();
  }, []);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section className="projects-section" id="projects" ref={projectsRef}>
      <h2 className="section-heading" data-num="03">
        <span>03.</span> {t.projectsTitle}
      </h2>

      <div className="projects-list">
        {PROJECTS.map((proj, i) => {
          const isOpen = expanded === proj.id;
          const summary = lang === 'en' ? proj.summaryEn : proj.summaryUa;
          const features = lang === 'en' ? proj.featuresEn : proj.featuresUa;
          const arch = lang === 'en' ? proj.archEn : proj.archUa;

          return (
            <article key={proj.id} className={`proj-card${isOpen ? ' proj-card--open' : ''}`}>
              {/* ── Header row ─────────────────────────────────────────── */}
              <div className="proj-header" onClick={() => toggle(proj.id)}>
                <div className="proj-meta">
                  <span className="proj-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="proj-lang">{proj.language}</span>
                </div>

                <h3 className="proj-name">{proj.name}</h3>

                <div className="proj-actions">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-github-link"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View on GitHub"
                  >
                    GitHub <ExternalLink size={13} />
                  </a>
                  <button className="proj-toggle" aria-label={isOpen ? 'Collapse' : 'Expand'}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* ── Summary (always visible) ───────────────────────────── */}
              <p className="proj-summary">{summary}</p>

              {/* ── Tags ───────────────────────────────────────────────── */}
              <div className="proj-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="proj-tag">{tag}</span>
                ))}
              </div>

              {/* ── Expanded details ────────────────────────────────────── */}
              {isOpen && (
                <div className="proj-details">
                  <div className="proj-details-grid">
                    <div className="proj-features">
                      <h4 className="proj-details-heading">
                        {lang === 'en' ? 'Key Features' : 'Ключові можливості'}
                      </h4>
                      <ul>
                        {features.map((f, fi) => (
                          <li key={fi}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="proj-arch">
                      <h4 className="proj-details-heading">
                        {lang === 'en' ? 'Architecture' : 'Архітектура'}
                      </h4>
                      <p>{arch}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
