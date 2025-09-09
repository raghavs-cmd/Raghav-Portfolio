import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

// Generic Icons for skill categories
const CodeIcon = () => <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;

const skillCategories = [
  {
    title: 'Programming & Libraries',
    icon: <CodeIcon />,
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
  },
  {
    title: 'Analytics & Visualization',
    icon: <ChartBarIcon />,
    skills: ['Tableau', 'Power BI', 'Excel'],
  },
  {
    title: 'Databases',
    icon: <DatabaseIcon />,
    skills: ['SQL', 'MySQL'],
  },
];

const SkillChip: React.FC<{ name: string; isInView: boolean; delay: number }> = ({ name, isInView, delay }) => (
    <div 
        className={`bg-dark-bg/60 py-2 px-4 rounded-lg flex items-center justify-center text-center border border-slate-700 hover:border-brand-purple/80 transition-all duration-300 transform hover:scale-105 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <span className="font-medium text-slate-300 text-sm">{name}</span>
    </div>
);

const Skills: React.FC = () => {
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
    <section id="skills" className="scroll-mt-24" ref={sectionRef}>
      <SectionHeader title="Technical Skills" subtitle="My Analytics Toolbox" />
      <div className="max-w-4xl mx-auto">
        {skillCategories.map((category) => (
          <div key={category.title} className="mb-12">
            <div className={`flex items-center gap-4 mb-6 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '100ms'}}>
              {category.icon}
              <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, index) => (
                <SkillChip 
                  key={skill} 
                  name={skill} 
                  isInView={isInView} 
                  delay={200 + index * 50} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;