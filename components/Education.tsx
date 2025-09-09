import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const educationData = [
  {
    institution: 'Scaler',
    degree: 'Certification in Data Science & Machine Learning',
    period: '2023 - 2025',
    details: [
      'Gained hands-on expertise in Python, SQL, Machine Learning, and data visualization.',
      'Applied statistical modeling and analytics to real-world case studies and projects.',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    institution: 'Sapient College of Commerce and Management',
    degree: 'Bachelor of Business Administration (BBA)',
    period: '2020 - 2023',
    details: [
      'Built a strong foundation in market dynamics, business strategy, and management.',
      'Winner of an inter-college competition for a product relaunch, securing 1st place.',
      'Participated in multiple projects applying business and analytical insights.',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.05-.625l2.056.516a1 1 0 001.28-.902V5.591l5.447-2.335a1 1 0 00.553-.884z" /><path d="M5 9.423l-2.032.508a1 1 0 00-.651.921V16.5a1 1 0 001 1h13a1 1 0 001-1v-6.148a1 1 0 00-.651-.921L15 9.423v.577a1 1 0 001.28.902l2.056-.516a.999.999 0 011.05.625l1.636 1.022a1 1 0 000-1.84l-7-3a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84l1.636-1.022a.999.999 0 011.05.625l2.056.516a1 1 0 001.28-.902V9.423z" /></svg>
  }
];

const EducationCard: React.FC<{ item: typeof educationData[0] }> = ({ item }) => (
    <div className="bg-dark-card p-6 rounded-xl border border-slate-700/50 shadow-lg hover:shadow-brand-green/20 hover:border-brand-green/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 mt-1">{item.icon}</div>
            <div>
                <h3 className="text-xl font-bold text-white">{item.institution}</h3>
                <p className="text-brand-blue font-semibold">{item.degree}</p>
                <span className="text-slate-400 text-sm font-mono mt-1 inline-block">{item.period}</span>
            </div>
        </div>
        <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm leading-relaxed mt-2">
            {item.details.map((detail, index) => (
                <li key={index}>{detail}</li>
            ))}
        </ul>
    </div>
);

const Education: React.FC = () => {
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
        <section id="education" className="scroll-mt-24">
            <SectionHeader title="Education" subtitle="My Academic Background" />
            <div
                ref={sectionRef}
                className="grid md:grid-cols-2 gap-8"
            >
                {educationData.map((item, index) => (
                    <div key={index} style={{ animationDelay: `${index * 150}ms` }} className={`opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}>
                         <EducationCard item={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;