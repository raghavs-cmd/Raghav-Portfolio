import React, { useState, useEffect } from 'react';

const BackgroundAnimation: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    handleResize(); // Set initial size

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const devX = mousePosition.x - windowSize.width / 2;
  const devY = mousePosition.y - windowSize.height / 2;

  // Parallax factors: Larger divisor = less movement (appears further away)
  const parallaxFactorSmall = 100;
  const parallaxFactorMedium = 75;
  const parallaxFactorLarge = 50;

  const getLayerStyle = (factor: number): React.CSSProperties => ({
    transform: `translateX(${devX / factor}px) translateY(${devY / factor}px)`,
    transition: 'transform 0.2s ease-out',
    willChange: 'transform',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div style={getLayerStyle(parallaxFactorSmall)}>
        <div id="stars-small" className="star-layer"></div>
      </div>
      <div style={getLayerStyle(parallaxFactorMedium)}>
        <div id="stars-medium" className="star-layer"></div>
      </div>
      <div style={getLayerStyle(parallaxFactorLarge)}>
        <div id="stars-large" className="star-layer"></div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;