import React, { useState, useEffect, useRef } from 'react';
import GooeyButton from './GooeyButton';

const phrases = [
  "Uncovering Insights",
  "Predicting Trends",
  "Driving Growth",
  "Turning Data into Decisions"
];

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroRef.current.style.setProperty('--mouse-x', `${x}px`);
        heroRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingSpeed = isDeleting ? 60 : 120;
    const timer = setTimeout(handleType, typingSpeed);

    return () => { clearTimeout(timer) };
  }, [typedText, isDeleting, loopNum]);


  return (
    <header ref={heroRef} className="hero-glow-container min-h-screen flex items-center justify-center relative px-4 py-24 md:py-0 overflow-hidden">
      <div className="absolute inset-0 bg-dark-bg/50 backdrop-blur-sm"></div>
      
      {/* Decorative data bits */}
      <div className="data-bit" style={{ top: '20%', left: '15%', width: '8px', height: '8px', animationDuration: '8s' }}></div>
      <div className="data-bit" style={{ top: '80%', left: '10%', width: '12px', height: '12px', animationDuration: '12s', animationDelay: '2s' }}></div>
      <div className="data-bit" style={{ top: '10%', left: '85%', width: '6px', height: '6px', animationDuration: '7s' }}></div>
      <div className="data-bit" style={{ top: '50%', left: '90%', width: '10px', height: '10px', animationDuration: '10s', animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* Profile Image with Orbit (first in DOM for mobile layout) */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 animate-fade-in-up lg:order-2 lg:justify-self-end mx-auto" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-full">
                <div className="orbit"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full blur-xl"></div>
                <div className="absolute inset-2 bg-dark-bg rounded-full flex items-center justify-center">
                    <div className="w-full h-full bg-dark-card rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                        {/* 
                            To add your profile picture:
                            1. Create a 'public' folder in the root of your project.
                            2. Place your image file (e.g., 'profile-image.jpg') inside the 'public' folder.
                            3. The 'src' attribute below should then be '/profile-image.jpg'.
                        */}
                        <img src="passport photo.jpeg" alt="Raghav S" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Text Content */}
        <div className="text-center lg:text-left animate-fade-in-up lg:order-1" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg md:text-xl text-brand-blue font-mono mb-2">
            Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Raghav S
          </h1>
          <div className="text-2xl md:text-3xl font-semibold min-h-[40px] md:min-h-[48px] flex items-center justify-center lg:justify-start mt-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-blue">
            {typedText}
            <span className="typing-cursor"></span>
          </div>
          <p className="mt-4 text-md md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
            A market research analyst passionate about uncovering stories in data. I turn complex datasets into actionable insights for business growth and strategic planning.
          </p>
          <div className="mt-8">
            <GooeyButton
                as="a"
                href="https://drive.google.com/file/d/1z_WBsgyVjt0agz9TFvxusXg_AXU66Eeh/view?usp=sharing" // Placeholder path
                download
                variant="purple"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
            </GooeyButton>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Hero;