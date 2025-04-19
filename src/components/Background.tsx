import React, { useEffect, useRef } from "react";

type Theme = {
  neon: string;
  bg: string;
  text: string;
};
const theme: Theme = {
  neon: '#AC9247',  
  bg: '#151515',  
  text: '#DFBE5D', 
};

const AnimatedBackground: React.FC = () => {
  const blobRefs = useRef<HTMLDivElement[]>([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId: number;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        const init = initialPositions[index];
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40;
        const x = init.x + xOffset;
        const y = init.y + yOffset;
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = 'transform 1.4s ease-out';
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScroll);
    requestId = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0" style={{ background: theme.bg }}>
      <div className="absolute inset-0">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => { if (el) blobRefs.current[i] = el; }}
            className="absolute rounded-full mix-blend-multiply filter blur-[128px]"
            style={{
              width: i < 2 ? (window.innerWidth < 768 ? '18rem' : '24rem') : '24rem',
              height: i < 2 ? (window.innerWidth < 768 ? '18rem' : '24rem') : '24rem',
              opacity: i % 2 === 0 ? 0.4 : 0.2,
              backgroundColor: i % 2 === 0 ? theme.neon : theme.text,
              top: i < 2 ? 0 : undefined,
              bottom: i >= 2 ? '-2rem' : undefined,
              left: i % 2 === 0 ? (i < 2 ? '-1rem' : '20%') : undefined,
              right: i % 2 === 1 ? (i < 2 ? '-1rem' : '5rem') : undefined,
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.text}10 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.text}10 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;