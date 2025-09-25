import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
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

  const socialLinks = [
      { href: 'https://www.linkedin.com/in/raghav-s-5b39a611a/', label: 'LinkedIn', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
      { href: 'https://scaler.com/academy/profile/edadd576aa3b', label: 'Scaler', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
  ];

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
          <Education />
          <Interests />
          <Projects />
          <Contact />
        </main>
        <footer className="text-center py-8 border-t border-slate-700/50 text-slate-400">
            <div className="flex justify-center items-center gap-6 mb-6">
                {socialLinks.map(link => (
                <a 
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-slate-400 hover:text-brand-blue transition-colors duration-300"
                >
                    {link.icon}
                </a>
                ))}
            </div>
          <p>&copy; {new Date().getFullYear()} Raghav S. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;