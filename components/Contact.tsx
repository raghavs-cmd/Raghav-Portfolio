import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const CreativeContactCard: React.FC<{ icon: React.ReactNode; title: string; value: string; href: string; }> = ({ icon, title, value, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-dark-card p-8 rounded-xl border border-slate-700/50 text-center overflow-hidden transition-all duration-300 transform hover:border-brand-purple hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-purple/20"
    >
        {/* Glowing effect on hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="text-brand-blue text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-300 font-mono text-lg">{value}</p>
            <div className="flex items-center justify-center mt-4 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Connect Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </a>
);


const Contact: React.FC = () => {
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
    <section id="contact" className="scroll-mt-24">
      <SectionHeader title="Let's Connect" subtitle="Open to new opportunities in Market Research & Analytics" />
      <div 
        ref={sectionRef}
        className={`max-w-4xl mx-auto opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CreativeContactCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                title="Send an Email"
                value="raghvv02@gmail.com"
                href="mailto:raghvv02@gmail.com"
            />
            <CreativeContactCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
                title="Chat on WhatsApp"
                value="+91 72595 12270"
                href="https://wa.me/917259512270"
            />
        </div>
      </div>
    </section>
  );
};

export default Contact;