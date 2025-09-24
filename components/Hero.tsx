import React, { useState, useEffect } from 'react';
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
    <header className="min-h-screen flex items-center justify-center relative px-4 py-16 md:py-0 overflow-hidden">
      <div className="absolute inset-0 bg-dark-bg/50 backdrop-blur-sm"></div>
      
      {/* Decorative data bits */}
      <div className="data-bit" style={{ top: '20%', left: '15%', width: '8px', height: '8px', animationDuration: '8s' }}></div>
      <div className="data-bit" style={{ top: '80%', left: '10%', width: '12px', height: '12px', animationDuration: '12s', animationDelay: '2s' }}></div>
      <div className="data-bit" style={{ top: '10%', left: '85%', width: '6px', height: '6px', animationDuration: '7s' }}></div>
      <div className="data-bit" style={{ top: '50%', left: '90%', width: '10px', height: '10px', animationDuration: '10s', animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* Text Content */}
        <div className="text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-white to-brand-green min-h-[100px] md:min-h-[168px] flex items-center justify-center lg:justify-start">
            {typedText}
            <span className="typing-cursor"></span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
            Hi, I'm Raghav. A market research analyst with a passion for uncovering the stories hidden within data. I transform complex datasets into actionable insights that drive business growth and strategic planning.
          </p>
          <div className="mt-8">
            <GooeyButton
                as="a"
                href="https://drive.google.com/file/d/1xd3a8WduccnlWZ70i9J50gsVkzGR5xq2/view?usp=sharing" // Placeholder path
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
        
        {/* Profile Image with Tilt Effect */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 animate-fade-in-up perspective-container" style={{ animationDelay: '0.4s' }}>
            <div className="tilt-card w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full blur-xl animate-float"></div>
                <div className="absolute inset-2 bg-dark-bg rounded-full flex items-center justify-center">
                    <div className="w-full h-full bg-dark-card rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                        {/* 
                            To add your profile picture:
                            1. Create a 'public' folder in the root of your project.
                            2. Place your image file (e.g., 'profile-image.jpg') inside the 'public' folder.
                            3. The 'src' attribute below should then be '/profile-image.jpg'.
                        */}
                        <img src="/raghav.jpeg" alt="Raghav S" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Hero;
