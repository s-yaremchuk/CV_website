import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import './styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'JavaScript', level: 85, color: '#f7df1e', tags: ['ES6+', 'Async/Await', 'DOM API', 'Fetch API'] },
  { name: 'HTML5', level: 80, color: '#e34f26', tags: ['Semantic', 'Forms', 'Accessibility', 'SEO'] },
  { name: 'CSS3', level: 75, color: '#1572b6', tags: ['Flexbox', 'Grid', 'Animations', 'Responsive'] },
  { name: 'React', level: 40, color: '#61dafb', tags: ['Components', 'Hooks', 'State', 'JSX'] },
  { name: 'REST API', level: 60, color: '#64ffda', tags: ['Fetch', 'JSON', 'CRUD', 'Auth'] },
  { name: 'Git', level: 55, color: '#f05032', tags: ['Branches', 'Commits', 'PR', 'GitHub'] },
  { name: 'SQL', level: 35, color: '#336791', tags: ['Queries', 'Joins', 'Design', 'PostgreSQL'] },
  { name: 'Node.js', level: 40, color: '#339933', tags: ['Express', 'npm', 'REST', 'Server'] }
];

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll
      const track = trackRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 40); // 40 for padding

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Progress bars animation
      gsap.utils.toArray('.skill-card__bar-fill').forEach((bar, i) => {
        gsap.to(bar, {
          width: `${skillsData[i].level}%`,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            containerAnimation: tween,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="section-heading"><span>02.</span> {t.skillsTitle}</h2>
      </div>
      
      <div className="skills-track" ref={trackRef}>
        {skillsData.map((skill, index) => (
          <div 
            key={index} 
            className="skill-card"
            style={{ '--skill-color': skill.color }}
          >
            <div className="skill-card__header">
              <h3 className="skill-card__name">{skill.name}</h3>
              <span className="skill-card__level">{skill.level}%</span>
            </div>
            
            <div className="skill-card__bar">
              <div className="skill-card__bar-fill"></div>
            </div>
            
            <div className="skill-card__tags">
              {skill.tags.map((tag, tIndex) => (
                <span key={tIndex} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
