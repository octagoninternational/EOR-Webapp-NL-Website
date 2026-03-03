export const APP_CONSTANTS = {
  // Timeline Defaults (2025 NL Estimates)
  // Dutch BV incorporation is fast via notary, but Bank Account (KYC) + Tax Reg is slow for foreign owners
  ENTITY_SETUP_WEEKS_MIN: 6,
  ENTITY_SETUP_WEEKS_MAX: 12, // Driven by Banking & Tax Registration
  EOR_SETUP_WEEKS_MIN: 1,
  EOR_SETUP_WEEKS_MAX: 2,
  
  // Costs in EUR (2025 Estimates)
  // Incorporation (Notary) ~2k, but Legal, Tax, Arbodienst setup, Risk Inventory (RI&E) adds up
  ENTITY_SETUP_COST_AVG: 5500, 
  
  // Annual Overhead: Accountant, Payroll admin, Mandatory Arbodienst, Sick leave insurance (very expensive in NL), Legal
  ENTITY_ANNUAL_MAINTENANCE: 60000, 
  
  // EOR Costs (EUR)
  EOR_SETUP_COST: 0,
  EOR_MONTHLY_FEE_AVG: 850, // EUR - typically higher in NL due to labor law complexity
  
  // Branding
  COLORS: {
    PINK: '#ed6a7b',
    NAVY: '#291756',
    PURPLE: '#8d4f7d',
    BLUE: '#b1dde4',
    YELLOW: '#ffee7a',
    GRAY: '#94a3b8'
  }
};