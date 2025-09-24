import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

// Icons for skill categories
const CrmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6M21 21v-1a6 6 0 00-6-6" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const CollaborationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const AiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4 4-4 5.293 5.293a1 1 0 010 1.414L13 24m5-16l2.293 2.293a1 1 0 010 1.414L15 11l-4 4 4-4 2.293 2.293a1 1 0 010 1.414L15 16" /></svg>;


const skillCategories = [
  {
    title: 'Market Research & CRM Tools',
    icon: <CrmIcon />,
    skills: ['Bigin CRM', 'Zoho'],
  },
  {
    title: 'Programming & Analytics',
    icon: <CodeIcon />,
    skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'SQL', 'MySQL'],
  },
  {
    title: 'Data Visualization',
    icon: <ChartBarIcon />,
    skills: ['Tableau', 'Power BI', 'Excel (PivotTables, Charts)'],
  },
  {
    title: 'Collaboration & PM Tools',
    icon: <CollaborationIcon />,
    skills: ['Google Meet', 'Monday.com', 'Zoho Cliq'],
  },
  {
    title: 'AI Tools',
    icon: <AiIcon />,
    skills: ['ChatGPT', 'Apollo.ai'],
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
        {skillCategories.map((category, catIndex) => (
          <div key={category.title} className="mb-12">
            <div className={`group flex items-center gap-4 mb-6 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`} style={{animationDelay: `${100 + catIndex * 200}ms`}}>
              {category.icon}
              <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, index) => (
                <SkillChip 
                  key={skill} 
                  name={skill} 
                  isInView={isInView} 
                  delay={200 + catIndex * 200 + index * 50} 
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