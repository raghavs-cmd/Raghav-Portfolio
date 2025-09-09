import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

// Icons for Areas of Interest
const ConsumerInsightsIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>;
const DataAnalyticsIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>;
const MarketResearchIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>;
const PredictiveAnalyticsIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline><path d="M7 13.5l2.5 2.5 5-5"></path></svg>;
const BusinessIntelligenceIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const DataStorytellingIcon = () => <svg className="w-12 h-12 mb-4 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;


const interestData = [
  {
    title: 'Consumer Insights',
    description: 'I analyze customer behavior, preferences, and feedback to uncover actionable insights that guide product and marketing strategies.',
    icon: <ConsumerInsightsIcon />,
  },
  {
    title: 'Data Analytics',
    description: 'I work with structured and unstructured data, applying statistical techniques and visualization tools to identify patterns and trends.',
    icon: <DataAnalyticsIcon />,
  },
  {
    title: 'Market Research',
    description: 'I conduct competitive benchmarking, market sizing, and segmentation studies to support strategic decision-making.',
    icon: <MarketResearchIcon />,
  },
  {
    title: 'Predictive Analytics',
    description: 'I use data modeling and forecasting techniques to predict market movements and consumer demand.',
    icon: <PredictiveAnalyticsIcon />,
  },
  {
    title: 'Business Intelligence',
    description: 'I design interactive dashboards and reports to communicate insights clearly to stakeholders and leadership teams.',
    icon: <BusinessIntelligenceIcon />,
  },
  {
    title: 'Data Storytelling',
    description: 'I transform complex data into compelling stories that help drive business growth and stakeholder alignment.',
    icon: <DataStorytellingIcon />,
  },
];

const InterestItem: React.FC<{ item: typeof interestData[0] }> = ({ item }) => (
    <div className="flex flex-col items-center text-center">
        {item.icon}
        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-slate-400 text-sm max-w-xs">{item.description}</p>
    </div>
);


const Interests: React.FC = () => {
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
    <section id="interests" className="scroll-mt-24">
      <SectionHeader title="Areas of Interest" subtitle="Take a look at some of the things i love working on." />
      <div 
        ref={sectionRef}
        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
      >
        {interestData.map((item) => (
          <InterestItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Interests;