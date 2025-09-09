import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import GooeyButton from './GooeyButton';

const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string; href: string }> = ({ icon, title, value, href }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-4 bg-dark-card p-4 rounded-lg border border-slate-700/50 hover:border-brand-purple transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
        <div className="text-brand-blue text-2xl">{icon}</div>
        <div>
            <p className="font-semibold text-white">{title}</p>
            <p className="text-slate-400">{value}</p>
        </div>
    </a>
);

const FormField: React.FC<{ id: string; type: 'text' | 'email'; label: string; required?: boolean }> = ({ id, type, label, required }) => (
    <div className="relative">
        <input 
            type={type} 
            id={id} 
            name={id}
            className="block w-full bg-dark-card p-3 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purple transition-shadow peer placeholder-transparent" 
            placeholder={label}
            required={required}
        />
        <label 
            htmlFor={id} 
            className="absolute left-3 -top-2.5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-brand-blue peer-focus:text-sm"
        >
            {label}
        </label>
    </div>
);

const TextAreaField: React.FC<{ id: string; label: string; required?: boolean }> = ({ id, label, required }) => (
    <div className="relative">
        <textarea 
            id={id}
            name={id}
            rows={5} 
            className="block w-full bg-dark-card p-3 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-purple transition-shadow peer placeholder-transparent" 
            placeholder={label}
            required={required}
        ></textarea>
        <label 
            htmlFor={id} 
            className="absolute left-3 -top-2.5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-brand-blue peer-focus:text-sm"
        >
            {label}
        </label>
    </div>
);

const Contact: React.FC = () => {
    const [isInView, setIsInView] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        // This endpoint uses your email. You will receive a confirmation email from Formspree
        // on the first submission. Please confirm it to start receiving messages.
        const formspreeEndpoint = 'https://formspree.io/f/raghvv02@gmail.com';
    
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (response.ok) {
                setIsSent(true);
                // Reset the form fields after successful submission
                form.reset();
            } else {
                // Handle server-side errors from Formspree
                alert('Oops! There was a problem submitting your form. Please try again.');
            }
        } catch (error) {
            // Handle network errors
            alert('Could not send message. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleResetForm = () => {
        setIsSent(false);
    }

  return (
    <section id="contact" className="scroll-mt-24">
      <SectionHeader title="Contact Me" subtitle="Let's Connect" />
      <div 
        ref={sectionRef}
        className={`grid lg:grid-cols-2 gap-12 opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
      >
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
            <div className="grid grid-cols-1 gap-4">
               <ContactInfoCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                    title="Email"
                    value="raghvv02@gmail.com"
                    href="mailto:raghvv02@gmail.com"
               />
               <ContactInfoCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
                    title="Phone"
                    value="+91-7259512270"
                    href="tel:+917259512270"
               />
            </div>
        </div>
        <div className="bg-dark-card p-8 rounded-xl border border-slate-700/50">
            {isSent ? (
                <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in-up">
                    <svg className="w-16 h-16 text-brand-green mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-300 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                    <GooeyButton onClick={handleResetForm} variant="purple">
                        Send Another Message
                    </GooeyButton>
                </div>
            ) : (
                 <>
                    <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField id="name" type="text" label="Your Name" required />
                        <FormField id="email" type="email" label="Your Email" required />
                        <TextAreaField id="message" label="Your Message" required />
                        <GooeyButton 
                            type="submit" 
                            disabled={isSubmitting}
                            variant="green"
                            className="w-full"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </GooeyButton>
                    </form>
                 </>
            )}
        </div>
      </div>
    </section>
  );
};

export default Contact;