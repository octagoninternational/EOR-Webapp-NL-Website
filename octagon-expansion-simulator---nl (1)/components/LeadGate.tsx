import React, { useState } from 'react';
import { Icons } from './Icons';
import { LeadData } from '../types';

interface Props {
  onUnlock: (data: LeadData) => void;
}

export const LeadGate: React.FC<Props> = ({ onUnlock }) => {
  const [formData, setFormData] = useState<LeadData>({
    fullName: '',
    workEmail: '',
    companyName: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail) {
      setError('Please provide your name and work email.');
      return;
    }
    if (!formData.workEmail.includes('@') || !formData.workEmail.includes('.')) {
        setError('Please enter a valid email address.');
        return;
    }
    // Simulate sending data to marketing@octagon.nl
    console.log("Lead captured for marketing@octagon.nl:", formData);
    onUnlock(formData);
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-octagon-pink/20 animate-fade-in-up">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-octagon-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Lock className="w-6 h-6 text-octagon-pink" />
          </div>
          <h3 className="text-xl font-bold text-octagon-navy">
            Unlock Your Full Strategic Report
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Get access to the detailed breakdown, risk analysis, and AI-generated executive summary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-octagon-pink focus:border-transparent outline-none transition-all"
              placeholder="e.g. Sarah Jennings"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-octagon-pink focus:border-transparent outline-none transition-all"
              placeholder="sarah@company.com"
              value={formData.workEmail}
              onChange={e => setFormData({...formData, workEmail: e.target.value})}
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-octagon-pink hover:bg-opacity-90 text-white font-bold py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            Unlock Analysis
            <Icons.Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          <p className="text-[10px] text-slate-400 text-center leading-tight mt-4">
            By unlocking, you agree to receive the report via email. We respect your privacy.
          </p>
        </form>
      </div>
    </div>
  );
};