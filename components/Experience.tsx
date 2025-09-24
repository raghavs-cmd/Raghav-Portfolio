import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const experienceData = [
  {
    role: 'Associate Market Research Analyst',
    company: 'Lingotran Private Limited',
    period: 'April 2025 - Present',
    description: 'Drove a 40% increase in sales through A/B testing and multi-platform campaigns, generating ₹1.25L in revenue. Developed real-time dashboards to track KPIs, accelerating decision-making. Refined product strategy using Excel and CRM analytics, which boosted user satisfaction by 15%.',
    kpis: [
      { label: 'Revenue Impact', value: '₹1.25L' },
      { label: 'Sales Growth', value: '+40%' },
      { label: 'User Satisfaction', value: '+15%' },
    ]
  },
  {
    role: 'Market Research Intern',
    company: 'Lingotran Private Limited',
    period: 'January 2025 - March 2025',
    description: 'Expanded pilot program reach by 20% by onboarding 24 teachers. Improved operational efficiency by 30% through CRM management and Gmail integration. Automated workflows with Zapier, increasing productivity by 25%.',
    kpis: [
      { label: 'Program Reach', value: '+20%' },
      { label: 'Efficiency Gain', value: '+30%' },
      { label: 'Productivity Boost', value: '+25%' },
    ]
  },
];

type ExperienceItem = typeof experienceData[0];

const KpiChip: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex items-center gap-2 bg-dark-bg/60 px-3 py-1.5 rounded-full border border-slate-700/80">
        <span className="text-brand-green font-mono font-bold text-sm">{value}</span>
        <span className="text-slate-400 text-xs tracking-wide">{label}</span>
    </div>
);

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
    <div className="bg-dark-card p-6 rounded-xl border border-slate-700/50 shadow-lg hover:shadow-brand-purple/20 hover:border-brand-purple/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
        <div className="flex flex-wrap justify-between items-baseline mb-2 gap-x-4 gap-y-2">
            <div>
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <p className="text-brand-blue font-semibold">{item.company}</p>
            </div>
            <span className="bg-slate-700 text-xs text-slate-300 font-mono px-2.5 py-1 rounded-md flex-shrink-0 text-center">{item.period}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed my-2">
            {item.description}
        </p>
        {item.kpis.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t border-slate-700/50">
                {item.kpis.map(kpi => (
                    <KpiChip key={kpi.label} label={kpi.label} value={kpi.value} />
                ))}
            </div>
        )}
    </div>
);


const Experience: React.FC = () => {
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
        <section id="experience" className="scroll-mt-24">
            <SectionHeader title="Work Experience" subtitle="My Career Timeline" />
            <div 
                ref={sectionRef}
                className={`opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
            >
                {/* Mobile: Vertical Timeline */}
                <div className="md:hidden relative border-l-2 border-slate-700/50 ml-3 pl-8 py-4">
                    {experienceData.map((item, index) => (
                        <div key={index} className="relative mb-10 last:mb-0">
                            <div className="absolute -left-[37px] top-1.5 w-4 h-4 bg-dark-bg rounded-full border-2 border-brand-purple"></div>
                            <ExperienceCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden md:block max-w-5xl mx-auto mt-12">
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700/50"></div>
                        <div className="relative flex justify-around">
                             {experienceData.map((item, index) => (
                                <div key={index} className="w-[45%] flex flex-col items-center">
                                    <div className={`relative w-full ${index % 2 === 0 ? 'mb-8' : 'mt-8'}`}>
                                        <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-purple rounded-full border-2 border-dark-bg z-10 ${index % 2 === 0 ? 'bottom-[-1.5rem]' : 'top-[-1.5rem]'}`}></div>
                                        <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-slate-700/50 ${index % 2 === 0 ? 'h-6 bottom-[-1.5rem] translate-y-full' : 'h-6 top-[-1.5rem] -translate-y-full'}`}></div>
                                        
                                        {/* Card with a pointer */}
                                        <div className="relative">
                                            <ExperienceCard item={item} />
                                            {/* Pointer element */}
                                            <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-card transform rotate-45 border-slate-700/50 ${index % 2 === 0 ? 'bottom-[-8px] border-b border-r' : 'top-[-8px] border-t border-l'}`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;