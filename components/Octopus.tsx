'use client';

import { useEffect, useRef } from 'react';

export default function Octopus() {
  const octoRef = useRef<HTMLImageElement>(null);

  // Optional: add basic parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (octoRef.current) {
        octoRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 pointer-events-none">
      <img
        ref={octoRef}
        src="/octopus.png"
        alt="Noēsis Octopus"
        className="w-32 animate-float opacity-80"
      />
    </div>
  );
}
