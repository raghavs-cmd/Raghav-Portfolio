
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
      <p className="text-md text-brand-blue font-mono">{subtitle}</p>
      <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded"></div>
    </div>
  );
};

export default SectionHeader;
