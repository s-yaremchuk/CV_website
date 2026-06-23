import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star, GitFork } from 'lucide-react';
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
        const res = await fetch(
          'https://api.github.com/users/s-yaremchuk/repos?sort=updated&per_page=6'
        );
        if (!res.ok) throw new Error('GitHub API error');
        const data = await res.json();
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
        gsap.fromTo(
          '.project-card',
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 82%',
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }, projectsRef);
      return () => ctx.revert();
    }
  }, [loading, projects]);

  return (
    <section className="projects-section" id="projects" ref={projectsRef}>
      <h2 className="section-heading" data-num="03">
        <span>03.</span> {t.projectsTitle}
      </h2>

      <div className="projects-grid">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="project-skeleton">
              <div className="skeleton-band" />
              <div className="skeleton-body">
                <div className="skeleton-line title" />
                <div className="skeleton-line d1" />
                <div className="skeleton-line d2" />
                <div className="skeleton-line d3" />
              </div>
              <div className="skeleton-footer-bar" />
            </div>
          ))
        ) : error ? (
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Error: {error}
          </p>
        ) : (
          projects.map((repo, i) => (
            <div key={repo.id} className="project-card">
              {/* Top band */}
              <div className="poster-band">
                <span>Repo — {String(i + 1).padStart(2, '0')}</span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poster-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View <ExternalLink size={11} />
                </a>
              </div>

              {/* Ghost number */}
              <span className="poster-num">{String(i + 1).padStart(2, '0')}</span>

              {/* Body */}
              <div className="poster-body">
                <h3 className="poster-title">{repo.name.replace(/-/g, ' ')}</h3>
                <p className="poster-desc">
                  {repo.description || '—'}
                </p>
              </div>

              {/* Footer */}
              <div className="poster-footer">
                <span className="poster-lang-tag">
                  {repo.language || 'N/A'}
                </span>
                <div className="poster-stats">
                  {repo.stargazers_count > 0 && (
                    <span className="poster-stat">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="poster-stat">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
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
