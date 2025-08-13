'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <button
        type="button"
        onClick={scrollToTop}
        className={`${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } inline-flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-white/10 text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-8 h-8" />
      </button>
    </div>
  );
}
