import React, { useState, useMemo } from 'react';
import { Icons } from './Icons';
import { SimulationInputs, SimulationResult } from '../types';

interface Props {
  inputs: SimulationInputs;
  results: SimulationResult;
}

export const RequestDetailsForm: React.FC<Props> = ({ inputs, results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // The existing Gravity Form page URL
  const FORM_URL = "https://octagonpeople.com/services/reachout/"; 

  // Generate the summary string for clipboard copy
  const summary = useMemo(() => {
    return [
      `--- Expansion Simulation Results ---`,
      `Recommendation: ${results.recommendation}`,
      `Fit Score: ${results.fitScore}/10`,
      `Primary Reason: ${results.primaryReason}`,
      ``,
      `--- Inputs ---`,
      `Headcount: ${inputs.headcount}`,
      `Duration: ${inputs.durationMonths} months`,
      `Urgency: ${inputs.urgency}`,
      `Priority: ${inputs.priority}`,
      `Citizenship: ${inputs.citizenship}`,
      `Knowledge: ${inputs.knowledgeLevel}`,
      `Industry: ${inputs.industry}`,
      `HQ: ${inputs.hqLocation}`,
      `Stage: ${inputs.companyStage}`,
      ``,
      `--- Financials (Est. Year 1) ---`,
      `Entity: €${results.entityTotalCostY1.toLocaleString()}`,
      `EOR: €${results.eorTotalCostY1.toLocaleString()}`,
    ].join('\n');
  }, [inputs, results]);

  // Construct the URL with specific 'oct_' query parameters for Gravity Forms pre-population
  const formUrlWithData = useMemo(() => {
    const params = new URLSearchParams();
    
    // Map Simulation Inputs to 'oct_' fields
    params.append('oct_headcount', String(inputs.headcount));
    params.append('oct_duration', String(inputs.durationMonths));
    params.append('oct_urgency', inputs.urgency);
    params.append('oct_priority', inputs.priority);
    params.append('oct_citizenship', inputs.citizenship);
    params.append('oct_knowledgeLevel', inputs.knowledgeLevel);
    params.append('oct_industry', inputs.industry);
    params.append('oct_hqlocation', inputs.hqLocation);
    params.append('oct_companyStage', inputs.companyStage);

    // Map Results (Optional, if fields exist)
    params.append('oct_recommendation', results.recommendation);
    params.append('oct_fit_score', String(results.fitScore));
    params.append('oct_entity_cost', String(results.entityTotalCostY1));
    params.append('oct_eor_cost', String(results.eorTotalCostY1));
    
    // Metadata
    params.append('oct_source', 'simulator');

    return `${FORM_URL}?${params.toString()}`;
  }, [inputs, results]);

  const handleClose = () => {
      setIsModalOpen(false);
      setCopySuccess('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed');
    }
  };

  return (
    <>
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-12 mt-12 text-center shadow-sm">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-octagon-navy mb-4">
            Discuss these results with an expert
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every expansion is unique. Get in touch to discuss the specific details of your simulation with our team.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-octagon-navy hover:bg-opacity-90 text-white font-bold text-base md:text-lg py-4 px-6 md:px-10 rounded-xl shadow-lg transition-all inline-flex items-center justify-center gap-3 transform hover:scale-105"
        >
          <span>Get More Details</span>
          <Icons.ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
        </button>
      </div>

      {/* MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col h-[90vh]">
            
            {/* Header */}
            <div className="bg-octagon-navy p-4 md:p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-full">
                    <Icons.Briefcase className="w-5 h-5 text-octagon-pink" />
                 </div>
                 <div>
                    <h3 className="text-lg md:text-xl font-bold">Contact Us</h3>
                 </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <Icons.Close className="w-5 h-5" />
              </button>
            </div>

            {/* Helper Bar */}
            <div className="bg-slate-50 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 shrink-0">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Icons.Info className="w-4 h-4 text-octagon-blue" />
                    <span>If the form is not pre-filled, please copy the results:</span>
                </p>
                <div className="flex gap-2">
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            copySuccess 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-white text-octagon-navy border border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                        {copySuccess ? <Icons.Check className="w-4 h-4" /> : <Icons.Copy className="w-4 h-4" />}
                        {copySuccess || 'Copy Results'}
                    </button>
                    <a 
                        href={formUrlWithData} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white text-octagon-navy border border-slate-300 hover:bg-slate-50 shadow-sm"
                    >
                        <Icons.ArrowRight className="w-4 h-4" />
                        Open in New Tab
                    </a>
                </div>
            </div>

            {/* Content Body - Iframe */}
            <div className="flex-1 w-full bg-white relative overflow-hidden">
                <iframe 
                    src={formUrlWithData}
                    className="w-full h-full border-0"
                    title="Octagon Contact Form"
                    loading="lazy"
                />
            </div>
          </div>
        </div>
      )}
    </>
  );
};