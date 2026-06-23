import React from 'react';
import './styles/PosterBackground.css';

// Words scattered in the background like Swiss design poster typography
const words = [
  { text: 'BACKEND',    x: '5%',   y: '12%',  rotate: -90, size: '9vw',  opacity: 0.032 },
  { text: 'NODE.JS',    x: '72%',  y: '8%',   rotate: 0,   size: '5vw',  opacity: 0.028 },
  { text: 'API',        x: '40%',  y: '22%',  rotate: -15, size: '14vw', opacity: 0.022 },
  { text: 'SQL',        x: '82%',  y: '38%',  rotate: 90,  size: '8vw',  opacity: 0.035 },
  { text: 'JAVASCRIPT', x: '10%',  y: '45%',  rotate: 0,   size: '4.5vw',opacity: 0.025 },
  { text: 'EXPRESS',    x: '55%',  y: '55%',  rotate: -90, size: '7vw',  opacity: 0.028 },
  { text: 'REACT',      x: '25%',  y: '68%',  rotate: 12,  size: '8vw',  opacity: 0.03  },
  { text: 'GIT',        x: '78%',  y: '72%',  rotate: -20, size: '11vw', opacity: 0.02  },
  { text: 'HTML',       x: '48%',  y: '82%',  rotate: 0,   size: '6vw',  opacity: 0.027 },
  { text: 'CSS',        x: '5%',   y: '88%',  rotate: -90, size: '7vw',  opacity: 0.03  },
  { text: 'POSTGRESQL', x: '60%',  y: '92%',  rotate: 0,   size: '3.5vw',opacity: 0.025 },
  { text: '{ }',        x: '88%',  y: '18%',  rotate: 0,   size: '10vw', opacity: 0.02  },
  { text: '//',         x: '33%',  y: '35%',  rotate: 0,   size: '8vw',  opacity: 0.018 },
  { text: '</>',        x: '18%',  y: '78%',  rotate: -8,  size: '7vw',  opacity: 0.022 },
];

const PosterBackground = () => {
  return (
    <div className="poster-bg" aria-hidden="true">
      {words.map((w, i) => (
        <span
          key={i}
          className="poster-bg__word"
          style={{
            left:      w.x,
            top:       w.y,
            transform: `rotate(${w.rotate}deg)`,
            fontSize:  w.size,
            opacity:   w.opacity,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
};

export default PosterBackground;
