import { APP_CONSTANTS } from '../constants';
import { SimulationInputs, SimulationResult, RecommendationType } from '../types';

export const calculateSimulation = (inputs: SimulationInputs): SimulationResult => {
  const { headcount, durationMonths, urgency, priority, citizenship, knowledgeLevel, industry, hqLocation, companyStage } = inputs;

  // 1. Calculate Financials (Year 1) - 2025 NL Estimates
  let entityTotalCostY1 = APP_CONSTANTS.ENTITY_SETUP_COST_AVG + APP_CONSTANTS.ENTITY_ANNUAL_MAINTENANCE;
  
  // Visa Cost Impact (IND Fees 2025 + Sponsorship Recognition + Legal)
  if (citizenship !== 'LOCAL') {
      // Recognized Sponsor status application (€4k+) + HSM Visa fees + Legal processing
      entityTotalCostY1 += 5500;
  }

  // Banking & Legal complexity for Non-NL HQ
  if (hqLocation === 'US' || hqLocation === 'OTHER') {
     entityTotalCostY1 += 3000; // Extra notary translation/legalization costs
  }

  const eorTotalCostY1 = APP_CONSTANTS.EOR_MONTHLY_FEE_AVG * headcount * 12;

  // 2. Determine Timeline
  let entityTimeWeeks = APP_CONSTANTS.ENTITY_SETUP_WEEKS_MAX;
  
  // Visa Impact on Time
  if (citizenship !== 'LOCAL') {
      entityTimeWeeks += 8; // IND Recognized Sponsor application + HSM Visa processing
  }

  // Banking/KYC Impact on Time
  if (hqLocation === 'US' || hqLocation === 'OTHER') {
      entityTimeWeeks += 6; // Non-Resident directors face strict Dutch banking checks
  } else if (hqLocation === 'NL') {
      entityTimeWeeks = 2; // Very fast if structure/bank exists
  }
  
  const eorTimeWeeks = APP_CONSTANTS.EOR_SETUP_WEEKS_MAX;

  // 3. Recommendation Scoring Algorithm
  // Range: -20 (Strong EOR) to +20 (Strong Entity)
  let score = 0;
  const insights: string[] = [];

  // --- FACTOR A: Headcount (Scale) ---
  if (headcount <= 1) { 
    score -= 5; 
    insights.push("Single hires are rarely cost-effective for a full Dutch BV setup."); 
  }
  else if (headcount <= 25) { 
    // Represents the 2-50 bucket (avg 25)
    score += 3; 
    insights.push("With a growing team, the fixed costs of a BV spread out efficiently.");
  }
  else { 
    // Represents 51+
    score += 6; 
    insights.push("Your significant headcount strongly justifies the overhead of a dedicated Dutch subsidiary."); 
  }

  // --- FACTOR B: Duration ---
  if (durationMonths <= 6) { score -= 4; insights.push("Short-term engagements favor the flexibility of EOR to avoid liquidation costs."); }
  else if (durationMonths <= 12) { score -= 2; }
  else if (durationMonths >= 36) { score += 3; insights.push("Long-term commitment (3+ years) aligns better with owning your own entity."); }

  // --- FACTOR C: Citizenship (Visas) ---
  if (citizenship === 'EXPAT' || citizenship === 'MIXED') {
      score -= 5;
      insights.push("To hire non-EU talent, your entity must be an IND Recognized Sponsor. EOR removes this hurdle.");
  }

  // --- FACTOR D: HQ Location (Banking/Legal) ---
  if (hqLocation === 'NL') {
      score += 5;
      insights.push("Since you are already based in NL, direct employment is straightforward.");
  } else if (hqLocation === 'EU') {
      score += 2;
  } else {
      score -= 4;
      insights.push("Non-NL Headquarters face significant banking KYC delays when setting up a local account.");
  }

  // --- FACTOR E: Company Stage ---
  if (companyStage === 'STARTUP') {
      score -= 3; // Conserve cash
      insights.push("Startups often prefer EOR to avoid the Year 1 admin liability (Arbodienst, sick leave risk).");
  } else if (companyStage === 'ENTERPRISE') {
      score += 4; // Prefer control
      insights.push("Enterprises typically require the full compliance control of their own Entity.");
  }

  // --- FACTOR F: Industry Specifics ---
  switch (industry) {
      case 'AEROSPACE':
          insights.push("Aerospace projects often require strict security clearance; EOR can manage vetting.");
          break;
      case 'ENERGY':
          insights.push("For project-based Energy roles, EOR allows for rapid demobilization without complex transition payments.");
          score -= 2;
          break;
      case 'IT_TECH':
          insights.push("Tech companies often use EOR to test the Dutch market before committing to IP transfer pricing.");
          break;
      case 'FINANCE':
          insights.push("AFM regulations might require you to hold your own licenses (Entity favored).");
          score += 2;
          break;
  }

  // --- FACTOR G: Knowledge ---
  if (knowledgeLevel === 'NONE') {
      score -= 3;
      insights.push("Dutch labor law (Gatekeeper Act, dismissal protection) is complex. Entity ownership carries high risk.");
  }

  // --- FACTOR H: Urgency ---
  if (urgency === 'ASAP') {
      score -= 5;
      insights.push("Immediate start dates are only possible via EOR (1-2 weeks).");
  }

  // Determine Result
  let recommendation: RecommendationType = 'HYBRID';
  let primaryReason = "A balanced approach may be required.";

  if (score <= -4) {
    recommendation = 'EOR';
    primaryReason = "Based on your need for agility and risk mitigation, the EOR model minimizes your administrative burden and IND compliance exposure.";
  } else if (score >= 4) {
    recommendation = 'ENTITY';
    primaryReason = "Your strategic scale and long-term goals make establishing a Dutch BV the most effective route.";
  } else {
    recommendation = 'HYBRID';
    primaryReason = "You are in the strategic 'Scale-Up Gap'. EOR offers speed now, but an Entity strategy should be prepared for the future.";
  }

  return {
    entityTimeWeeks,
    eorTimeWeeks,
    entityTotalCostY1,
    eorTotalCostY1,
    recommendation,
    fitScore: score,
    primaryReason,
    insights
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
};