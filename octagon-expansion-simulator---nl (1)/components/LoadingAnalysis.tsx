import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';

export const LoadingAnalysis: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingMessages = [
    "Analyzing 2025 Dutch Employment Regulations...",
    "Calculating Tax & Social Security Implications...",
    "Estimating IND Visa & Sponsorship Timelines...",
    "Comparing Dutch BV vs. EOR Costs...",
    "Generating Strategic Recommendation..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600); // Change text every 600ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-8">
        {/* Pulsing Background */}
        <div className="absolute inset-0 bg-octagon-pink/20 rounded-full animate-ping"></div>
        
        <div className="relative bg-white p-6 rounded-full shadow-xl border-2 border-slate-50">
          <Icons.Cpu className="w-12 h-12 text-octagon-navy animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-octagon-navy mb-2">
        Processing Data
      </h3>
      
      <div className="h-8">
        <p className="text-slate-500 font-medium animate-fade-in key-{textIndex}">
          {loadingMessages[textIndex]}
        </p>
      </div>

      <div className="w-64 h-1.5 bg-slate-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-octagon-pink animate-[loading_2.5s_ease-in-out_infinite] w-1/3 rounded-full"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};