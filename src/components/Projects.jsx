import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/s-yaremchuk/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        
        // Filter out forks if preferred, or just take first 6
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.project-card', {
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }, projectsRef);

      return () => ctx.revert();
    }
  }, [loading, projects]);

  return (
    <section className="projects-section" id="projects" ref={projectsRef}>
      <h2 className="section-heading"><span>03.</span> {t.projectsTitle}</h2>
      
      <div className="projects-grid">
        {loading ? (
          // Skeleton Loaders
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="project-skeleton">
              <div className="skeleton-line title"></div>
              <div className="skeleton-line desc1"></div>
              <div className="skeleton-line desc2"></div>
              <div className="skeleton-line desc3"></div>
              <div className="skeleton-footer">
                <div className="skeleton-line tag"></div>
                <div className="skeleton-line tag"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="error-message">Error loading projects: {error}</div>
        ) : (
          projects.map((repo) => (
            <div key={repo.id} className="project-card">
              <div className="project-card__header">
                <div className="project-card__folder">📁</div>
                <div className="project-card__links">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">↗</a>
                </div>
              </div>
              <h3 className="project-card__title">{repo.name}</h3>
              <p className="project-card__description">
                {repo.description || 'No description provided.'}
              </p>
              <div className="project-card__footer">
                <div className="project-card__tech">
                  {repo.language && <span>{repo.language}</span>}
                </div>
                <div className="project-card__stats">
                  {repo.stargazers_count > 0 && (
                    <span className="project-card__stat">⭐ {repo.stargazers_count}</span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="project-card__stat">🍴 {repo.forks_count}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
