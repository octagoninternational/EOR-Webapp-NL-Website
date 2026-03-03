import React from 'react';
import { SimulationResult, SimulationInputs } from '../types';
import { Icons } from './Icons';

interface Props {
  results: SimulationResult;
  inputs: SimulationInputs;
}

export const DetailedAnalysis: React.FC<Props> = ({ results, inputs }) => {
  const isEntityRecommended = results.recommendation === 'ENTITY';
  const isEorRecommended = results.recommendation === 'EOR';
  
  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* 1. THE VERDICT SECTION */}
      <div className={`rounded-3xl overflow-hidden shadow-lg border-l-[16px] ${isEntityRecommended ? 'border-slate-500' : isEorRecommended ? 'border-octagon-pink' : 'border-octagon-yellow'}`}>
        <div className="bg-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className={`p-6 rounded-full shrink-0 ${isEntityRecommended ? 'bg-slate-100' : isEorRecommended ? 'bg-red-50' : 'bg-yellow-50'}`}>
               {isEntityRecommended ? <Icons.Building className="w-12 h-12 text-slate-600"/> : isEorRecommended ? <Icons.Zap className="w-12 h-12 text-octagon-pink"/> : <Icons.Scale className="w-12 h-12 text-yellow-600"/>}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-octagon-navy mb-4">
                Recommendation: <span className={isEntityRecommended ? 'text-slate-600' : isEorRecommended ? 'text-octagon-pink' : 'text-yellow-600'}>
                  {isEntityRecommended ? 'Establish Your Own Entity (BV)' : isEorRecommended ? 'Use an EOR Provider' : 'Hybrid / Assessment Needed'}
                </span>
              </h2>
              
              <p className="text-slate-700 text-xl md:text-2xl leading-relaxed mb-8">
                  {results.primaryReason}
              </p>
              
              {/* Personalized Insights List */}
              {results.insights.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-5">Key Factors in this result</h4>
                  <ul className="space-y-4">
                    {results.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-4 text-lg text-octagon-navy font-medium items-start">
                        <Icons.ArrowRight className="w-6 h-6 text-octagon-pink shrink-0 mt-1" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. BALANCED COMPARISON TABLE */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50">
           <h3 className="text-2xl font-bold text-octagon-navy">Comparative Risk & Benefit Analysis</h3>
        </div>
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* EOR Column */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Icons.Shield className="text-octagon-pink w-8 h-8"/>
              <h4 className="text-xl font-bold text-slate-800">Employer of Record (EOR)</h4>
            </div>
            
            <div className="space-y-8">
              <div>
                <span className="text-sm font-bold text-green-600 uppercase tracking-wide mb-3 block">Pros</span>
                <ul className="space-y-4">
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> Start in days, not months</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> Handles StiPP/Sector Pension & Arbodienst</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> No IND Recognized Sponsor status needed</li>
                </ul>
              </div>
              <div>
                 <span className="text-sm font-bold text-red-500 uppercase tracking-wide mb-3 block">Cons</span>
                 <ul className="space-y-4">
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Alert className="w-6 h-6 text-red-400 shrink-0"/> Higher cost per employee at scale (15+)</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Alert className="w-6 h-6 text-red-400 shrink-0"/> Less direct control over legal contracts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Entity Column */}
           <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Icons.Building className="text-slate-600 w-8 h-8"/>
              <h4 className="text-xl font-bold text-slate-800">Dutch BV (Besloten Vennootschap)</h4>
            </div>
            
             <div className="space-y-8">
              <div>
                <span className="text-sm font-bold text-green-600 uppercase tracking-wide mb-3 block">Pros</span>
                <ul className="space-y-4">
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> Full brand presence & IP control</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> Cost efficient for large teams (&gt;15)</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Check className="w-6 h-6 text-green-500 shrink-0"/> Ability to sponsor visas directly (IND)</li>
                </ul>
              </div>
              <div>
                 <span className="text-sm font-bold text-red-500 uppercase tracking-wide mb-3 block">Cons</span>
                 <ul className="space-y-4">
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Alert className="w-6 h-6 text-red-400 shrink-0"/> Complex Belastingdienst & Sick Leave risk</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Alert className="w-6 h-6 text-red-400 shrink-0"/> Strict dismissal protection laws (UWV)</li>
                   <li className="flex gap-4 text-lg text-slate-600"><Icons.Alert className="w-6 h-6 text-red-400 shrink-0"/> 8-12 weeks setup if banking is complex</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    
    </div>
  );
};