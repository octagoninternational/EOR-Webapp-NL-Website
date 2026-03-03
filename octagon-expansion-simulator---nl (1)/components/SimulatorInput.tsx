import React, { useState } from 'react';
import { SimulationInputs, HeadcountRange, DurationRange, Urgency, Priority, Citizenship, KnowledgeLevel, Industry, HqLocation, CompanyStage } from '../types';
import { Icons } from './Icons';

interface Props {
  inputs: SimulationInputs;
  setInputs: React.Dispatch<React.SetStateAction<SimulationInputs>>;
  onComplete: () => void;
}

export const SimulatorInput: React.FC<Props> = ({ inputs, setInputs, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const updateInput = (key: keyof SimulationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              What is your projected headcount for the Netherlands?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'Just 1 hire', value: 1, icon: Icons.Users, desc: 'Testing the market' },
                { label: '2 - 50 people', value: 25, icon: Icons.Users, desc: 'Small to Mid-size Team' },
                { label: '51 - 500 people', value: 250, icon: Icons.Building, desc: 'Scale-up / Expansion' },
                { label: '500+ people', value: 600, icon: Icons.Building, desc: 'Corporate / Enterprise' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('headcount', opt.value as HeadcountRange)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left"
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-slate-100 group-hover:bg-white p-4 rounded-full transition-colors">
                      <opt.icon className="w-8 h-8 text-slate-400 group-hover:text-octagon-pink" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                      <span className="text-sm text-slate-500">{opt.desc}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
         return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Which sector describes your business?
            </h2>
            <p className="text-center text-slate-500 text-lg -mt-5 mb-8">
               We tailor the compliance advice based on industry risk profiles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'IT, Tech & Data', value: 'IT_TECH', icon: Icons.Cpu },
                { label: 'Aerospace & Defense', value: 'AEROSPACE', icon: Icons.Plane },
                { label: 'Energy & Renewables', value: 'ENERGY', icon: Icons.Leaf },
                { label: 'Finance & Fintech', value: 'FINANCE', icon: Icons.Bank },
                { label: 'Life Sciences / Pharma', value: 'PHARMA', icon: Icons.Pharma },
                { label: 'Other / Corporate', value: 'OTHER', icon: Icons.Briefcase },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('industry', opt.value as Industry)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left flex items-center gap-5"
                >
                   <opt.icon className="w-8 h-8 text-slate-400 group-hover:text-octagon-pink flex-shrink-0" />
                   <span className="text-lg font-bold text-octagon-navy">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Where is your company HQ located?
            </h2>
             <p className="text-center text-slate-500 text-lg -mt-5 mb-8">
              This impacts banking setup times and Know Your Customer (KYC) procedures.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Already in NL', value: 'NL', icon: Icons.Flag, desc: 'Expanding current entity.' },
                { label: 'European Union (EEA)', value: 'EU', icon: Icons.Globe, desc: 'Single Euro Payments Area.' },
                { label: 'United States', value: 'US', icon: Icons.Globe, desc: 'Standard expansion route.' },
                { label: 'Rest of World', value: 'OTHER', icon: Icons.Location, desc: 'Requires legalization/notary.' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('hqLocation', opt.value as HqLocation)}
                  className="w-full group p-6 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left flex items-center justify-between"
                >
                   <div className="flex items-center gap-5">
                      <opt.icon className="w-6 h-6 text-slate-400 group-hover:text-octagon-pink" />
                      <div>
                        <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                        <span className="text-sm text-slate-500">{opt.desc}</span>
                      </div>
                   </div>
                   <Icons.ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-octagon-pink" />
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Where is the talent coming from?
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Local Residents (Dutch/EU)', value: 'LOCAL', icon: Icons.Users, desc: 'No Visa sponsorship needed.' },
                { label: 'Expats (Need Visa)', value: 'EXPAT', icon: Icons.Plane, desc: 'Requires HSM (Kennismigrant) Sponsorship.' },
                { label: 'Mixed Team', value: 'MIXED', icon: Icons.Users, desc: 'A combination of both.' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('citizenship', opt.value as Citizenship)}
                  className="w-full group p-6 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left flex items-center justify-between"
                >
                   <div className="flex items-center gap-5">
                      <opt.icon className="w-6 h-6 text-slate-400 group-hover:text-octagon-pink" />
                      <div>
                        <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                        <span className="text-sm text-slate-500">{opt.desc}</span>
                      </div>
                   </div>
                   <Icons.ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-octagon-pink" />
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              What is your current company stage?
            </h2>
             <p className="text-center text-slate-500 text-lg -mt-5 mb-8">
              Determines your tolerance for upfront capital vs. monthly operational costs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Startup', value: 'STARTUP', icon: Icons.Rocket, desc: '1-20 employees' },
                { label: 'Scale-up', value: 'SCALEUP', icon: Icons.Trend, desc: '20-100 employees' },
                { label: 'Enterprise', value: 'ENTERPRISE', icon: Icons.Office, desc: '100+ employees' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('companyStage', opt.value as CompanyStage)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-4"
                >
                   <div className="bg-slate-100 group-hover:bg-white p-5 rounded-full">
                      <opt.icon className="w-10 h-10 text-slate-400 group-hover:text-octagon-pink" />
                   </div>
                   <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                   <span className="text-sm text-slate-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
           <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Familiarity with Dutch Employment Law?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'New to this', value: 'NONE', icon: Icons.Education, desc: 'Need full guidance.' },
                { label: 'Basic knowledge', value: 'BASIC', icon: Icons.Briefcase, desc: 'Know 30% Ruling/CLA.' },
                { label: 'Expert', value: 'EXPERT', icon: Icons.Scale, desc: 'Have legal team.' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('knowledgeLevel', opt.value as KnowledgeLevel)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-4"
                >
                   <div className="bg-slate-100 group-hover:bg-white p-5 rounded-full">
                      <opt.icon className="w-10 h-10 text-slate-400 group-hover:text-octagon-pink" />
                   </div>
                   <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                   <span className="text-sm text-slate-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Project duration / Engagement length?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: '< 6 Months', value: 6, icon: Icons.Clock },
                { label: 'approx. 1 Year', value: 12, icon: Icons.Calendar },
                { label: 'approx. 2 Years', value: 24, icon: Icons.Calendar },
                { label: 'Indefinite / Permanent', value: 36, icon: Icons.Shield },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('durationMonths', opt.value as DurationRange)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left flex items-center gap-5"
                >
                   <opt.icon className="w-8 h-8 text-slate-400 group-hover:text-octagon-pink" />
                   <span className="text-lg font-bold text-octagon-navy">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Target Start Date?
            </h2>
            <div className="space-y-4">
              {[
                { label: 'ASAP (Yesterday!)', value: 'ASAP', icon: Icons.Zap, desc: 'Critical need for speed.' },
                { label: 'Within 1-3 Months', value: 'SOON', icon: Icons.Rocket, desc: 'Standard hiring timeline.' },
                { label: '3 Months +', value: 'LATER', icon: Icons.Calendar, desc: 'Long-term planning.' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('urgency', opt.value as Urgency)}
                  className="w-full group p-6 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-left flex items-center justify-between"
                >
                   <div className="flex items-center gap-5">
                      <opt.icon className="w-6 h-6 text-slate-400 group-hover:text-octagon-pink" />
                      <div>
                        <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                        <span className="text-sm text-slate-500">{opt.desc}</span>
                      </div>
                   </div>
                   <Icons.ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-octagon-pink" />
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-octagon-navy text-center">
              Primary Strategic Driver?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Speed', value: 'SPEED', icon: Icons.Zap, desc: 'Get boots on the ground fast.' },
                { label: 'Cost', value: 'COST', icon: Icons.Euro, desc: 'Minimize Year 1 expenditure.' },
                { label: 'Control', value: 'CONTROL', icon: Icons.Scale, desc: 'Full legal/IP control required.' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => updateInput('priority', opt.value as Priority)}
                  className="group p-6 md:p-8 border-2 border-slate-100 rounded-2xl hover:border-octagon-pink hover:bg-slate-50 transition-all text-center flex flex-col items-center gap-4"
                >
                   <div className="bg-slate-100 group-hover:bg-white p-5 rounded-full">
                      <opt.icon className="w-10 h-10 text-slate-400 group-hover:text-octagon-pink" />
                   </div>
                   <span className="block text-lg font-bold text-octagon-navy">{opt.label}</span>
                   <span className="text-sm text-slate-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
        <div 
          className="h-full bg-octagon-pink transition-all duration-500 ease-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100 min-h-[450px] flex flex-col justify-center animate-fade-in-up">
        
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="self-start text-sm font-bold text-slate-400 hover:text-octagon-pink flex items-center gap-2 mb-6 uppercase tracking-wide"
          >
            ← Back
          </button>
        )}

        {renderStep()}

      </div>
    </div>
  );
};