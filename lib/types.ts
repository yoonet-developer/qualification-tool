export type BusinessType = 
  | 'healthcare'
  | 'ecommerce'
  | 'accounting'
  | 'marketing'
  | 'trades'
  | 'financial'
  | 'other';

export type TeamSize = 
  | 'solo'
  | 'small'
  | 'growing'
  | 'established'
  | 'corporate';

export type Timeline = 
  | 'yesterday'
  | 'month'
  | 'quarter'
  | 'research';

export type WorkingHours = 
  | 'australian'
  | 'overlap'
  | '24/7'
  | 'flexible';

export type BudgetExpectation = 
  | 'aligned'
  | 'higher-but-worth'
  | 'under-1000'
  | 'need-education';

export interface QualificationResponse {
  questionId: string;
  answer: string | string[];
  scoreImpact: number;
  timestamp: Date;
}

export interface Lead {
  id: string;
  businessType?: BusinessType;
  businessSize?: TeamSize;
  industrySpecificData: Record<string, any>;
  qualificationScore: number;
  stageCompleted: number;
  responses: QualificationResponse[];
  createdDate: Date;
  lastActive: Date;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
}

export interface Question {
  id: string;
  stage: number;
  text: string;
  type: 'single' | 'multiple' | 'ranking' | 'text';
  options?: QuestionOption[];
  conditions?: QuestionCondition[];
  nextQuestion?: string;
  scoringRules?: ScoringRule[];
}

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  internalNote?: string;
  routeTo?: string;
  scoreModifier?: number;
}

export interface QuestionCondition {
  field: string;
  operator: 'equals' | 'contains' | 'in' | 'notEquals';
  value: any;
  action: 'show' | 'hide' | 'route';
  target?: string;
}

export interface ScoringRule {
  condition: QuestionCondition;
  points: number;
}

export interface QualificationResult {
  score: number;
  category: 'hot' | 'warm' | 'nurture' | 'redirect';
  headline: string;
  body: string;
  ctaText?: string;
  ctaAction?: string;
  recommendations?: string[];
}

export interface FormData {
  businessType?: BusinessType;
  teamSize?: TeamSize;
  painPoint?: string;
  timeline?: Timeline;
  practiceSystem?: string[];
  complianceConcerns?: string[];
  patientVolume?: string;
  platform?: string;
  orderVolume?: string;
  bottleneck?: string;
  software?: string[];
  serviceTypes?: string[];
  peakSeasonPain?: string;
  teamPhilosophy?: string;
  investmentMindset?: string[];
  communityImpact?: string;
  previousExperience?: string;
  workingHours?: WorkingHours;
  teamSizeNeeded?: string;
  skillPriority?: string[];
  budgetReality?: BudgetExpectation;
}