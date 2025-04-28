import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroProps {
  onApplyClick: () => void;
}

export default function Hero({ onApplyClick }: HeroProps) {
  const navigate = useNavigate();

  const handleExplorePrograms = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const programsSection = document.getElementById('featured-programs');
    if (programsSection) {
      const headerOffset = 80;
      const elementPosition = programsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      programsSection.focus();
    }
  };

  const handleApplyNow = () => {
    navigate('/apply');
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-[90rem] mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sm:text-center lg:text-left"
            >
              <h1 className="tracking-tight font-extrabold text-gray-900 dark:text-white">
                <span className="block text-3xl sm:text-3xl md:text-4xl leading-tight">
                  Get Paid While Learning at{' '}
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-blue-600 dark:text-blue-400 mt-2">
                  FolioTech Institute
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                Empowering the next generation of tech leaders through cutting-edge education, 
                industry partnerships, and hands-on learning experiences.
              </p>
              <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyNow}
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-lg text-white 
                    bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                    transition-colors md:py-4 md:text-lg md:px-10 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                    dark:focus:ring-offset-gray-900 shadow-md"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExplorePrograms}
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-lg 
                    text-blue-600 dark:text-blue-400 bg-transparent 
                    border-2 border-blue-600 dark:border-blue-400 
                    hover:bg-blue-50 dark:hover:bg-blue-900/20 
                    transition-colors md:py-4 md:text-lg md:px-10
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                    dark:focus:ring-offset-gray-900"
                >
                  Explore Programs
                </motion.button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Students collaborating in a modern tech environment with hands-on circuit board work"
          className="h-48 sm:h-72 md:h-96 w-full object-cover lg:w-full lg:h-full"
          loading="lazy"
          srcSet="
            https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&w=800&q=80 800w,
            https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&w=1200&q=80 1200w,
            https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&w=2070&q=80 2070w
          "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export { Hero };