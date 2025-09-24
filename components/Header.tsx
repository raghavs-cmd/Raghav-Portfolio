import React, { useState } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-slate-300 hover:text-brand-blue transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </a>
);

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="block text-slate-300 hover:text-brand-blue transition-colors duration-300 px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  );

const SocialIconLink: React.FC<{ href: string; children: React.ReactNode; ariaLabel: string }> = ({ href, children, ariaLabel }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="text-slate-400 hover:text-brand-blue transition-colors duration-300"
    >
        {children}
    </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#interests', label: 'Interests' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const socialLinks = [
      { href: 'https://www.linkedin.com/in/raghav-s-5b39a611a/', label: 'LinkedIn', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
      { href: 'https://scaler.com/academy/profile/edadd576aa3b', label: 'Scaler', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
        const headerOffset = 80; // height of the header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-dark-bg/80 backdrop-blur-md z-40 border-b border-slate-700/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-2xl font-mono hover:text-brand-blue transition-colors" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Raghav S
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-baseline space-x-4">
              {navLinks.map(link => <NavLink key={link.href} href={link.href} onClick={handleLinkClick}>{link.label}</NavLink>)}
            </nav>
            <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
                {socialLinks.map(link => (
                    <SocialIconLink key={link.href} href={link.href} ariaLabel={link.label}>
                        {link.icon}
                    </SocialIconLink>
                ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" 
              aria-controls="mobile-menu" 
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navLinks.map(link => <MobileNavLink key={link.href} href={link.href} onClick={handleLinkClick}>{link.label}</MobileNavLink>)}
             <div className="flex items-center space-x-4 px-3 pt-4 border-t border-slate-700">
                {socialLinks.map(link => (
                    <SocialIconLink key={link.href} href={link.href} ariaLabel={link.label}>
                        {link.icon}
                    </SocialIconLink>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;