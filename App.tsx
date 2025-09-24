import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Interests from './components/Interests';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${(totalScroll / windowHeight) * 100}`;
    setScrollProgress(Number(scroll));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div 
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      />
      <Header />
      <BackgroundAnimation />
      <div className="relative z-10">
        <Hero />
        <main className="container mx-auto px-6 md:px-12 py-16 space-y-24">
          <About />
          <Skills />
          <Experience />
          <Interests />
          <Projects />
          <Contact />
        </main>
        <footer className="text-center py-8 border-t border-slate-700/50 text-slate-400">
          <p>&copy; {new Date().getFullYear()} Raghav S. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;