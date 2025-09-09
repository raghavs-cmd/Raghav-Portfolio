import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        },
        { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
        observer.observe(currentRef);
    }

    return () => {
        if (currentRef) {
            observer.unobserve(currentRef);
        }
    };
  }, []);

  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeader title="About Me" subtitle="My Professional Journey" />
      <div 
        ref={sectionRef}
        className={`opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
      >
        <div className="max-w-3xl mx-auto text-center bg-dark-card/50 p-8 rounded-xl backdrop-blur-sm border border-slate-700/50">
          <p className="text-lg leading-relaxed text-slate-300">
            Hi, I’m Raghav, a market research analyst with a creative flair for numbers. I enjoy finding patterns in data and turning them into strategies that foster growth. At Lingotran, I’ve focused on data analysis and marketing. I build dashboards, interpret trends, and create campaigns that resonate with people.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;