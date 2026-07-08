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
    id: 'digital-time-machine',
    name: 'Digital Time Machine — Interactive Chronicle',
    url: 'https://github.com/s-yaremchuk/DigitalTimeMachine',
    language: 'JavaScript',
    tags: ['React 19', 'Framer Motion', 'REST API', 'Vite', 'CSS Custom Properties'],
    summaryEn: 'A client-side SPA that functions as an interactive newspaper chronicle. Users enter any date, and the application aggregates currency rates, top songs, historical events, memes, and trending videos for that specific time, rendering them in a vintage broadsheet layout.',
    summaryUa: 'Клієнтський SPA у вигляді інтерактивної газети-хроніки. Користувач вводить довільну дату, а застосунок збирає для неї курси валют, топ-пісні, історичні події, меми та відео, рендерячи все це у стилі класичного газетного розвороту.',
    featuresEn: [
      'Integration with 3 public APIs: Frankfurter, iTunes Search, and Wikimedia "On This Day"',
      'Curated local databases for memes, movies, and YouTube trends by year',
      'Procedural generated "stains" (coffee rings/ink) using seeded PRNG (mulberry32) for deterministic rendering per date',
      'SVG noise and multiple CSS gradients to simulate realistic paper texture',
      'Audio player for iTunes previews with auto-pause across multiple instances',
      'Framer Motion for layout transitions and staggered reveals',
      'Robust fallback strategies for missing API data (e.g. math-based currency generation)'
    ],
    featuresUa: [
      'Інтеграція з 3 публічними API: Frankfurter, iTunes Search, Wikimedia "On This Day"',
      'Кураторські локальні бази для мемів, фільмів та YouTube трендів за роками',
      'Процедурна генерація "плям" (від кави/чорнила) через seeded PRNG для детермінованого вигляду на певну дату',
      'SVG-шум та множинні CSS-градієнти для імітації реалістичної текстури паперу',
      'Аудіоплеєр для прев\'ю iTunes з авто-паузою інших треків',
      'Framer Motion для анімацій переходів та плавної появи контенту',
      'Надійні стратегії фолбеків при відсутності даних (напр. математична генерація курсів)'
    ],
    archEn: 'Data aggregation layer handles parallel API requests (Promise.all) with graceful degradation. Strict CSP configuration in index.html. Custom seeded PRNG ensures visual consistency without storing state.',
    archUa: 'Шар агрегації даних обробляє паралельні запити (Promise.all) із graceful degradation. Жорстка конфігурація CSP. Кастомний seeded PRNG гарантує візуальну консистентність без збереження стану.'
  },
  {
    id: 'smart-todo',
    name: 'Smart To-Do — Google Calendar Sync',
    url: 'https://github.com/s-yaremchuk/To-do',
    language: 'JavaScript',
    tags: ['React 19', 'OAuth 2.0 PKCE', 'Google Calendar API', 'Web Crypto API', 'Vite'],
    summaryEn: 'A client-side task management SPA featuring two-way synchronization with Google Calendar. Handles OAuth 2.0 authorization, data persistence, and API interactions entirely in the browser without a dedicated backend server.',
    summaryUa: 'Клієнтський SPA для управління завданнями з двосторонньою синхронізацією через Google Calendar API. Обробляє OAuth 2.0 авторизацію, збереження даних та взаємодію з API повністю в браузері без бекенд-сервера.',
    featuresEn: [
      'Full OAuth 2.0 Authorization Code Flow with PKCE implemented from scratch',
      'SHA-256 Code Challenge generation using native Web Crypto API',
      'Two-way sync: CRUD operations reflect locally and on Google Calendar',
      'Automatic token refresh lifecycle running in the background',
      'Optimistic UI updates with manual rollback on API failure',
      'Batch synchronization for offline-created tasks',
      'Graceful handling of external event deletions (HTTP 404/410)'
    ],
    featuresUa: [
      'Повноцінний OAuth 2.0 PKCE флоу, реалізований з нуля',
      'Генерація SHA-256 Code Challenge через нативний Web Crypto API',
      'Двостороння синхронізація: CRUD операції відображаються локально та в Google Calendar',
      'Автоматичне оновлення токену у фоновому режимі',
      'Optimistic UI оновлення з відкатом при помилці API',
      'Пакетна синхронізація для завдань, створених офлайн',
      'Обробка зовнішніх видалень подій з календаря (HTTP 404/410)'
    ],
    archEn: 'Context API abstracts the entire OAuth lifecycle. Service Module Pattern isolates HTTP logic (googleCalendar.js). State management uses React hooks with localStorage persistence as the single source of truth.',
    archUa: 'Context API абстрагує весь життєвий цикл OAuth. Сервісний патерн ізолює HTTP-логіку. Управління станом використовує хуки React з localStorage як єдиним джерелом істини.'
  },
  {
    id: 'weather-web',
    name: 'WeatherWeb — Ukraine Forecast SPA',
    url: 'https://github.com/s-yaremchuk/WeatherWeb',
    language: 'JavaScript',
    tags: ['React 19', 'Open-Meteo API', 'Geolocation API', 'localStorage', 'Vite'],
    summaryEn: 'A lightweight weather SPA providing current conditions and a 5-day forecast for Ukrainian settlements. Integrates native browser APIs for location tracking and persists user preferences locally.',
    summaryUa: 'Легкий погодний SPA, що надає поточні умови та прогноз на 5 днів для населених пунктів України. Інтегрує нативні браузерні API для геолокації та зберігає налаштування користувача локально.',
    featuresEn: [
      'Automatic geolocation using native Browser Geolocation API',
      'Reverse geocoding via OpenStreetMap Nominatim API',
      'City search with 400ms debounced autocomplete suggestions',
      '5-day forecast powered by Open-Meteo API with hourly drill-down',
      'Persistent "Home Location" selection via localStorage',
      'Light/Dark theme toggling using CSS Custom Properties'
    ],
    featuresUa: [
      'Автоматична геолокація через нативний Browser Geolocation API',
      'Зворотне геокодування через OpenStreetMap Nominatim API',
      'Пошук міст з автодоповненням (debounce 400мс)',
      'Прогноз на 5 днів від Open-Meteo API з погодинною деталізацією',
      'Збереження "Домашньої локації" через localStorage',
      'Перемикання світлої/темної теми на CSS-змінних'
    ],
    archEn: 'Monolithic component architecture prioritizing rapid data access. Implements fallback chaining for location resolution and maps WMO weather codes to UI states seamlessly.',
    archUa: 'Монолітна компонентна архітектура з пріоритетом на швидкий доступ до даних. Реалізує ланцюжок фолбеків для геокодування та мапить погодні коди WMO на стани UI.'
  },
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
    id: 'inventory-admin',
    name: 'Inventory Admin — Full-Stack CRUD System',
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
    id: 'inventory-gallery',
    name: 'Inventory Gallery — Read-Only Frontend with Favourites',
    url: 'https://github.com/s-yaremchuk/web-frontend-Lab8',
    language: 'JavaScript',
    tags: ['React 18', 'React Router v7', 'Context API', 'Fetch API', 'CSS Modules', 'localStorage'],
    summaryEn: 'React frontend application that consumes the Inventory Admin REST API (Lab 7) and presents inventory items as a visual gallery. Focuses on consumer-side patterns: reading from an existing API, managing derived client-side state, and persisting user preferences without a backend round-trip.',
    summaryUa: 'React-застосунок, що споживає REST API з Lab 7 та відображає інвентар у вигляді візуальної галереї. Фокусується на клієнтських патернах: інтеграція з існуючим API, робота з локальним станом та збереження обраних елементів у браузері без участі сервера.',
    featuresEn: [
      'Gallery view: responsive CSS Grid of inventory cards fetched from the Lab 7 API',
      'Skeleton loading state with 8 placeholder cards (eliminates layout shifts)',
      'Quick-view modal with full-size image loaded on demand from /api/inventory/:id',
      'Modal dismissible via close button, backdrop click, or Escape key',
      'Favourites system: toggle status per card with real-time count in navigation badge',
      'Persistent favourites via localStorage (survives page refresh)',
      'Dedicated /favorites route with option to remove individual entries',
      'Error recovery with "Try again" button that re-triggers fetch without page reload',
    ],
    featuresUa: [
      'Галерея: адаптивний CSS Grid з картками, завантаженими з API Lab 7',
      'Skeleton-завантаження з 8 заглушками для уникнення стрибків макету',
      'Quick-view модальне вікно з повним зображенням за /api/inventory/:id',
      'Закриття модального вікна кнопкою, кліком на фон або клавішею Escape',
      'Система улюблених: перемикач на кожній картці з лічильником у навігації',
      'Персистентні улюблені через localStorage (зберігаються після перезавантаження)',
      'Окрема сторінка /favorites з можливістю видалення записів',
      'Відновлення після помилки API кнопкою "Спробувати знову"',
    ],
    archEn: 'Context API (FavoritesContext) provides a global favourites store. A dedicated custom hook useFavorites.js is the single source of truth for localStorage reads/writes. All API calls isolated in inventoryApi.js using the native Fetch API.',
    archUa: 'Context API (FavoritesContext) надає глобальне сховище улюблених. Кастомний хук useFavorites.js — єдине місце читання/запису в localStorage. Всі API-виклики ізольовані у inventoryApi.js через нативний Fetch API.',
  },
  {
    id: 'train-search',
    name: 'Ukrzaliznytsia Train Search — React SPA',
    url: 'https://github.com/s-yaremchuk/web-frontend-Lab9',
    language: 'JavaScript',
    tags: ['React 19', 'Vite 8', 'CSS Modules', 'CSS Variables', 'Client-side filtering'],
    summaryEn: 'Single-page React application that replicates the core search experience of Ukraine\'s national railway operator. Users can browse a static train catalogue and filter it in real time by departure city, arrival city, train number, or travel date — all without a backend.',
    summaryUa: 'Односторінковий React-застосунок, що відтворює основний пошук Укрзалізниці. Перегляд статичного каталогу поїздів із фільтрацією в реальному часі за містом відправлення/прибуття, номером поїзда або датою — без серверної частини.',
    featuresEn: [
      'Train catalogue: each card shows route, times, duration, wagon classes, min price',
      'Real-time text search across departure city, arrival city, and train number simultaneously',
      'Date filter via native date picker — narrows results to a specific travel date',
      'Combined filtering: text and date filters compose correctly together',
      'Responsive CSS Grid layout: single column on mobile, multi-column on desktop',
      'Staggered card fade-in on first load + hover micro-animations',
      'Brand-consistent UI following Ukrzaliznytsia visual identity (navy, yellow accents)',
    ],
    featuresUa: [
      'Каталог поїздів: картка показує номер, маршрут, час, тривалість, класи, ціни',
      'Пошук у реальному часі за трьома полями одночасно без затримки',
      'Фільтр за датою через нативний date picker',
      'Комбінована фільтрація: текст і дата складаються коректно',
      'Адаптивний CSS Grid: одна колонка на мобільному, декілька на десктопі',
      'Staggered fade-in при першому завантаженні + hover-мікроанімації',
      'Бренд-стиль Укрзалізниці (темно-синій, жовті акценти, Inter)',
    ],
    archEn: 'Minimal single-page architecture without routing. Filter state lives in Home.jsx via useState. Filtering logic uses Array.filter() on a static trains.js dataset. Components: SearchBar (controlled inputs), TrainCard (presentational), TrainList (mapping).',
    archUa: 'Мінімальна односторінкова архітектура без маршрутизації. Стан фільтрів у Home.jsx через useState. Фільтрація через Array.filter() на статичному наборі trains.js. Компоненти: SearchBar, TrainCard, TrainList.',
  },
  {
    id: 'seat-selection',
    name: 'Ukrzaliznytsia — Interactive Seat Selection SPA',
    url: 'https://github.com/s-yaremchuk/web-frontend-Lab10',
    language: 'JavaScript',
    tags: ['React 19', 'Context API', 'React Router v7', 'localStorage', 'CSS Modules', 'Vite'],
    summaryEn: 'React SPA extending the train search (Lab 9) into a full ticket booking flow. The key challenge was building an interactive, class-aware wagon seat map entirely in CSS/JSX, coordinating multi-step state across components via Context API, and implementing regex-based form validation with real-time feedback.',
    summaryUa: 'React SPA, що розширює пошук поїздів (Lab 9) до повного процесу бронювання квитків. Ключовий виклик — побудова інтерактивної схеми вагона на CSS/JSX, координація стану через Context API та валідація форм з regex у реальному часі.',
    featuresEn: [
      'Wagon class selector: Плацкарт (54 seats), Купе (36 seats), СВ (18 seats)',
      'Visual seat map with conductor cabin, corridor, toilets rendered in JSX',
      'Three-state seats: Available / Selected (pulse animation) / Occupied (from localStorage)',
      'Passenger form: name, phone (+380 regex), email with blur-triggered inline errors',
      'Submit button disabled until seat selected and all fields pass validation',
      'Booking persistence to localStorage; booked seats immediately turn red on map',
      'Slide-in animated Toast auto-dismissed after 3 seconds',
    ],
    featuresUa: [
      'Вибір класу вагона: Плацкарт (54 місця), Купе (36), СВ (18)',
      'Візуальна схема вагона з купе провідника, коридором та туалетами',
      'Три стани місць: Вільне / Обране (анімація) / Заброньоване (із localStorage)',
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
