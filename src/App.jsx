import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PosterBackground from './components/PosterBackground';

import 'lenis/dist/lenis.css';
import './index.css';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const lenisRaf = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenisRaf);
    };
  }, []);

  return (
    <LanguageProvider>
      <PosterBackground />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <hr className="swiss-divider swiss-divider--thick" />
          <About />
          <hr className="swiss-divider" />
          <Skills />
          <hr className="swiss-divider" />
          <Projects />
          <hr className="swiss-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
