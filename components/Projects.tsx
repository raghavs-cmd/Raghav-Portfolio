import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

type Project = {
  title: string;
  tools: string;
  description: string;
  methodology: string;
  insights: string[];
  visual: React.ReactNode;
};

const BarChartIcon = () => (
    <svg className="w-full h-24 text-slate-500" viewBox="0 0 100 60">
        <line x1="10" y1="5" x2="10" y2="55" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="10" y1="55" x2="95" y2="55" stroke="currentColor" strokeWidth="0.5"/>
        
        <rect x="20" y="55" width="10" height="0" className="text-brand-blue/70" fill="currentColor">
             <animate attributeName="height" from="0" to="30" dur="0.5s" fill="freeze" begin="0.1s" />
             <animate attributeName="y" from="55" to="25" dur="0.5s" fill="freeze" begin="0.1s" />
        </rect>
        <rect x="40" y="55" width="10" height="0" className="text-brand-green/70" fill="currentColor">
            <animate attributeName="height" from="0" to="45" dur="0.5s" fill="freeze" begin="0.2s" />
            <animate attributeName="y" from="55" to="10" dur="0.5s" fill="freeze" begin="0.2s" />
        </rect>
        <rect x="60" y="55" width="10" height="0" className="text-brand-purple/70" fill="currentColor">
            <animate attributeName="height" from="0" to="25" dur="0.5s" fill="freeze" begin="0.3s" />
            <animate attributeName="y" from="55" to="30" dur="0.5s" fill="freeze" begin="0.3s" />
        </rect>
        <rect x="80" y="55" width="10" height="0" className="text-brand-blue/70" fill="currentColor">
            <animate attributeName="height" from="0" to="40" dur="0.5s" fill="freeze" begin="0.4s" />
            <animate attributeName="y" from="55" to="15" dur="0.5s" fill="freeze" begin="0.4s" />
        </rect>
    </svg>
);

const NetflixVisualIcon = () => (
    <div className="flex items-center justify-center h-24 w-full gap-4">
        <div className="w-1/2 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 p-1">
            <span className="text-lg text-brand-blue font-bold animate-pulse" style={{animationDelay: '0.2s'}}>Drama</span>
            <span className="text-xs text-brand-green">Comedy</span>
            <span className="text-xl text-brand-purple font-bold animate-pulse">Action</span>
            <span className="text-md text-white">Thriller</span>
            <span className="text-sm text-brand-green animate-pulse" style={{animationDelay: '0.4s'}}>Sci-Fi</span>
        </div>
        <div className="w-1/2 flex items-end justify-start h-full gap-1.5 border-l border-slate-700 pl-3">
            <div className="w-2 bg-brand-purple rounded-t-sm" style={{height: '80%'}}></div>
            <div className="w-2 bg-brand-blue rounded-t-sm" style={{height: '70%'}}></div>
            <div className="w-2 bg-brand-green rounded-t-sm" style={{height: '55%'}}></div>
            <div className="w-2 bg-brand-purple/70 rounded-t-sm" style={{height: '40%'}}></div>
        </div>
    </div>
);


const PieChartIcon = () => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const segment1 = 0.4 * circumference; // 40%
    const segment2 = 0.35 * circumference; // 35%
    const segment3 = 0.25 * circumference; // 25%

    return (
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <style>
                {`
                    .pie-segment {
                        stroke-dasharray: ${circumference};
                        animation: draw-pie 1.5s ease-out forwards;
                    }
                    @keyframes draw-pie {
                        from { stroke-dashoffset: ${circumference}; }
                        to { stroke-dashoffset: 0; }
                    }
                `}
            </style>
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#1a1a2e" strokeWidth="10" />
            
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#8A2BE2" strokeWidth="10"
                strokeDasharray={`${segment1} ${circumference - segment1}`}
                className="pie-segment"
                style={{ animationDelay: '0s' }}
            />
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#32CD32" strokeWidth="10"
                strokeDasharray={`${segment2} ${circumference - segment2}`}
                strokeDashoffset={-segment1}
                className="pie-segment"
                style={{ animationDelay: '0.2s' }}
            />
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#00BFFF" strokeWidth="10"
                strokeDasharray={`${segment3} ${circumference - segment3}`}
                strokeDashoffset={-(segment1 + segment2)}
                className="pie-segment"
                style={{ animationDelay: '0.4s' }}
            />
        </svg>
    );
};

const LineGraphIcon = () => (
     <svg className="w-full h-24" viewBox="0 0 100 50">
        <style>
            {`
                .line-path {
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: draw-line 2s ease-out forwards;
                }
                .dot {
                    opacity: 0;
                    animation: fade-in-dot 0.5s ease-out forwards;
                }
                @keyframes draw-line {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes fade-in-dot {
                    to { opacity: 1; }
                }
            `}
        </style>
        <line x1="0" y1="10" x2="100" y2="10" stroke="#1a1a2e" strokeWidth="0.5"/>
        <line x1="0" y1="25" x2="100" y2="25" stroke="#1a1a2e" strokeWidth="0.5"/>
        <line x1="0" y1="40" x2="100" y2="40" stroke="#1a1a2e" strokeWidth="0.5"/>

        <path d="M 0 40 Q 25 10, 50 30 T 100 20" stroke="#00BFFF" fill="none" strokeWidth="2" className="line-path" />

        <g className="dot" style={{ animationDelay: '0.8s' }}>
            <circle cx="50" cy="30" r="3" fill="#32CD32" stroke="#0a0a1a" strokeWidth="1"/>
            <text x="50" y="25" fill="#32CD32" fontSize="5" textAnchor="middle">Peak</text>
        </g>
        <g className="dot" style={{ animationDelay: '1.5s' }}>
            <circle cx="100" cy="20" r="3" fill="#8A2BE2" stroke="#0a0a1a" strokeWidth="1"/>
             <text x="90" y="15" fill="#8A2BE2" fontSize="5" textAnchor="middle">Weekend</text>
        </g>
    </svg>
);

const projectsData: Project[] = [
  {
    title: 'Target Order Analysis',
    tools: 'SQL',
    description: 'Analyzed order data to identify pricing and delivery trends.',
    methodology: 'Used SQL queries to aggregate sales data, calculated average delivery times, and segmented orders by price range to understand customer purchasing behavior.',
    insights: ['Identified a 20% faster delivery time for orders above ₹500.', 'Found that most orders occur between 6 PM and 9 PM.'],
    visual: <BarChartIcon />,
  },
  {
    title: 'Netflix Analysis',
    tools: 'Python, Matplotlib',
    description: 'Explored Netflix content library to find genre and release trends.',
    methodology: 'Performed EDA on the Netflix dataset using Pandas. Visualized genre frequency with Matplotlib and generated a word cloud of popular movie titles.',
    insights: ['Dramas and Comedies are the most frequent genres.', 'Content production has increased by over 300% in the last 5 years.'],
    visual: <NetflixVisualIcon />,
  },
    {
    title: 'Aerofit Study',
    tools: 'Python, Seaborn',
    description: 'Segmented customers based on purchasing behavior for a fitness brand.',
    methodology: 'Applied clustering algorithms to customer data. Visualized segments using pie charts and pair plots in Seaborn to define distinct customer personas.',
    insights: ['Identified three key customer segments: Casual, Fitness Enthusiast, and Pro-Athlete.', 'Fitness Enthusiasts have the highest customer lifetime value.'],
    visual: <PieChartIcon />,
  },
  {
    title: 'Yulu Demand Analysis',
    tools: 'Python, Pandas',
    description: 'Analyzed seasonal demand for a bike-sharing service.',
    methodology: 'Conducted time-series analysis on rental data. Used line graphs to visualize demand fluctuations across seasons and annotated key events impacting ridership.',
    insights: ['Peak demand occurs during pre-monsoon and post-monsoon seasons.', 'Weekend ridership is 60% higher than on weekdays.'],
    visual: <LineGraphIcon />,
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
    <section id="projects" className="scroll-mt-24">
      <SectionHeader title="Projects" subtitle="My Data-Driven Case Studies" />
      <div 
        ref={sectionRef}
        className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
      >
        {projectsData.map((project) => (
          <div
            key={project.title}
            className="bg-dark-card p-6 rounded-lg border border-slate-700/50 cursor-pointer group hover:border-brand-purple transition-all duration-300"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-center justify-center h-28 mb-4">
              {project.visual}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-purple">{project.title}</h3>
            <p className="text-slate-400 text-sm mt-1">{project.description}</p>
            <span className="inline-block bg-slate-700 text-brand-blue text-xs font-mono px-2 py-1 rounded mt-4">{project.tools}</span>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-dark-card w-full max-w-2xl rounded-xl p-8 border border-brand-purple shadow-2xl shadow-brand-purple/20 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    <span className="inline-block bg-slate-700 text-brand-blue text-sm font-mono px-3 py-1 rounded mt-2">{selectedProject.tools}</span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-brand-green">Methodology</h4>
                <p className="text-slate-300">{selectedProject.methodology}</p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-green">Key Insights</h4>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {selectedProject.insights.map((insight, i) => <li key={i}>{insight}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;