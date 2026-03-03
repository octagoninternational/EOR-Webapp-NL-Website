export type HeadcountRange = 1 | 25 | 250 | 600; // 1, 2-50, 51-500, 500+
export type DurationRange = 6 | 12 | 24 | 36; // <6mo, 1yr, 2yr, Indefinite
export type Urgency = 'ASAP' | 'SOON' | 'LATER'; // <1mo, 1-3mo, 3mo+
export type Priority = 'SPEED' | 'COST' | 'CONTROL';

// New Dimensions
export type Citizenship = 'LOCAL' | 'EXPAT' | 'MIXED'; // Dutch/EU vs Rest of World (HSM Visa impact)
export type KnowledgeLevel = 'NONE' | 'BASIC' | 'EXPERT'; // Impact on risk appetite (CLA/Labor Law)

// Updated for Octagon Specifics
export type Industry = 'IT_TECH' | 'AEROSPACE' | 'ENERGY' | 'FINANCE' | 'PHARMA' | 'OTHER';
export type HqLocation = 'NL' | 'EU' | 'US' | 'OTHER'; // Changed UK to NL
export type CompanyStage = 'STARTUP' | 'SCALEUP' | 'ENTERPRISE';

export interface SimulationInputs {
  headcount: HeadcountRange;
  durationMonths: DurationRange;
  urgency: Urgency;
  priority: Priority;
  citizenship: Citizenship;
  knowledgeLevel: KnowledgeLevel;
  industry: Industry;
  hqLocation: HqLocation;
  companyStage: CompanyStage;
}

export type RecommendationType = 'EOR' | 'ENTITY' | 'HYBRID';

export interface SimulationResult {
  entityTimeWeeks: number;
  eorTimeWeeks: number;
  
  // Financials Year 1
  entityTotalCostY1: number; // Setup + Admin
  eorTotalCostY1: number; // Fees * HC * 12
  
  // The Verdict
  recommendation: RecommendationType;
  fitScore: number; // -10 (Strong EOR) to +10 (Strong Entity)
  primaryReason: string;
  
  // Personalized Insights
  insights: string[];
}

export interface LeadData {
  fullName: string;
  workEmail: string;
  companyName?: string;
}