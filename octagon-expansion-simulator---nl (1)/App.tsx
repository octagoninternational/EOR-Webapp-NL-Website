import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SimulationInputs } from './types';
import { calculateSimulation } from './services/calculationService';
import { SimulatorInput } from './components/SimulatorInput';
import { TeaserResults } from './components/TeaserResults';
import { DetailedAnalysis } from './components/DetailedAnalysis';
import { RequestDetailsForm } from './components/RequestDetailsForm';
import { LoadingAnalysis } from './components/LoadingAnalysis';

const App: React.FC = () => {
  const [hasCompletedWizard, setHasCompletedWizard] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Ref for the main container to measure exact content height
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Defaults
  const [inputs, setInputs] = useState<SimulationInputs>({
    headcount: 1,
    durationMonths: 12,
    urgency: 'SOON',
    priority: 'SPEED',
    citizenship: 'LOCAL',
    knowledgeLevel: 'BASIC',
    industry: 'IT_TECH',
    hqLocation: 'NL',
    companyStage: 'SCALEUP'
  });

  const results = useMemo(() => calculateSimulation(inputs), [inputs]);

  // --- Exact Content Resize Logic ---
  useEffect(() => {
    if (!contentRef.current) return;

    let lastHeight = 0;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Measure the content box height directly
        const height = Math.ceil(entry.contentRect.height);
        
        // Add a small buffer for margins/shadows (60px)
        const totalHeight = height + 60;

        // Only update if change is significant (>5px) to prevent jitter loops
        if (Math.abs(totalHeight - lastHeight) > 5) {
             lastHeight = totalHeight;
             window.parent.postMessage({ type: 'setHeight', height: totalHeight }, '*');
        }
      }
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasCompletedWizard, isCalculating]); 

  const handleWizardComplete = () => {
    setHasCompletedWizard(true);
    setIsCalculating(true);
    
    // Smooth scroll the parent window if possible
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.parent.postMessage({ type: 'scrollToTop' }, '*');
    } catch (e) { /* ignore cross-origin errors */ }

    // Simulate Calculation Delay
    setTimeout(() => {
      setIsCalculating(false);
    }, 2500);
  };

  return (
    // bg-white, h-fit to shrink-wrap content
    <div ref={contentRef} className="bg-white font-sans text-slate-800 pb-8 w-full h-fit overflow-hidden relative">
      
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        
        {!hasCompletedWizard ? (
          <div className="animate-fade-in">
             <div className="text-center mb-12 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-octagon-navy mb-6 leading-tight">
                    Expansion Strategy Assessment
                </h2>
                <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                    Compare the strategic fit and financial impact of opening a Dutch Entity vs. using an Employer of Record.
                </p>
            </div>
            <SimulatorInput 
              inputs={inputs} 
              setInputs={setInputs} 
              onComplete={handleWizardComplete} 
            />
          </div>
        ) : isCalculating ? (
           <LoadingAnalysis />
        ) : (
          <div className="space-y-16 animate-fade-in-up">
            
            {/* Header for Results View */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-octagon-navy">Your Custom Analysis</h2>
                <button 
                  onClick={() => {
                    setHasCompletedWizard(false);
                  }}
                  className="text-lg text-octagon-pink hover:underline mt-4 font-medium"
                >
                  Start Over
                </button>
            </div>

            {/* Teaser Charts */}
            <TeaserResults results={results} />

            {/* Full Analysis */}
            <DetailedAnalysis 
              results={results} 
              inputs={inputs} 
            />
            
            {/* CTA -> Scrolls parent to form */}
            <RequestDetailsForm inputs={inputs} results={results} />

          </div>
        )}

      </main>

      {/* Disclaimer Footer - Reduced margin */}
      <footer className="max-w-5xl mx-auto px-6 mt-6">
        <div className="text-sm text-slate-400 text-center max-w-3xl mx-auto leading-relaxed opacity-75">
            <p>
                *Estimates based on 2025 Dutch market data. Actual costs for entity incorporation, IND recognition, and legal compliance may vary. 
                This tool is for informational purposes only and does not constitute legal, tax, or financial advice. 
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;