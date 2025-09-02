import { Question, QuestionOption } from './types';

export const BUSINESS_TYPE_OPTIONS: QuestionOption[] = [
  {
    value: 'healthcare',
    label: 'Healthcare & Allied Health Practice',
    icon: '🏥',
    internalNote: 'HIGH PRIORITY - Route to specialized track',
    scoreModifier: 30
  },
  {
    value: 'ecommerce',
    label: 'E-commerce or Digital Agency',
    icon: '📱',
    internalNote: 'HIGH PRIORITY - Route to digital track',
    scoreModifier: 25
  },
  {
    value: 'accounting',
    label: 'Accounting or Bookkeeping Firm',
    icon: '📊',
    internalNote: 'MEDIUM PRIORITY - Check for Xero/MYOB',
    scoreModifier: 20
  },
  {
    value: 'marketing',
    label: 'Marketing or Creative Agency',
    icon: '🎯',
    internalNote: 'HIGH PRIORITY - Route to creative track',
    scoreModifier: 25
  },
  {
    value: 'trades',
    label: 'Trades & Construction',
    icon: '🏗️',
    internalNote: 'MEDIUM PRIORITY - Basic admin support',
    scoreModifier: 10
  },
  {
    value: 'financial',
    label: 'Financial Advisory or Legal Services',
    icon: '💼',
    internalNote: 'REDIRECT to alternative solution',
    scoreModifier: -50
  },
  {
    value: 'other',
    label: 'Other Professional Services',
    icon: '🏢',
    internalNote: 'QUALIFY FURTHER',
    scoreModifier: 10
  }
];

export const TEAM_SIZE_OPTIONS: QuestionOption[] = [
  {
    value: 'solo',
    label: 'Solo founder wearing too many hats',
    icon: '👤',
    internalNote: 'High touch, needs hand-holding',
    scoreModifier: 5
  },
  {
    value: 'small',
    label: 'Small team drowning in admin (2-5 people)',
    icon: '👥',
    internalNote: 'Sweet spot - urgent need',
    scoreModifier: 10
  },
  {
    value: 'growing',
    label: 'Growing fast, need to scale smart (6-15 people)',
    icon: '🚀',
    internalNote: 'Best lifetime value',
    scoreModifier: 15
  },
  {
    value: 'established',
    label: 'Established, looking to optimise (16-50 people)',
    icon: '🏢',
    internalNote: 'Needs ROI focus',
    scoreModifier: 10
  },
  {
    value: 'corporate',
    label: 'Corporate team (50+ people)',
    icon: '🏛️',
    internalNote: 'Check for owner involvement',
    scoreModifier: -15
  }
];

export const TIMELINE_OPTIONS: QuestionOption[] = [
  {
    value: 'yesterday',
    label: 'Yesterday! We\'re overwhelmed',
    icon: '🔥',
    internalNote: 'HIGH URGENCY - Fast track',
    scoreModifier: 10
  },
  {
    value: 'month',
    label: 'Within the next month',
    icon: '📅',
    internalNote: 'NORMAL PROCESS',
    scoreModifier: 5
  },
  {
    value: 'quarter',
    label: 'Exploring options for next quarter',
    icon: '🔍',
    internalNote: 'NURTURE TRACK',
    scoreModifier: 0
  },
  {
    value: 'research',
    label: 'Just researching',
    icon: '💭',
    internalNote: 'EDUCATION TRACK',
    scoreModifier: -5
  }
];

export const PAIN_POINTS = {
  healthcare: [
    'Patient admin is stealing time from patient care',
    'Drowning in appointment scheduling and follow-ups',
    'Medicare/insurance claims are a nightmare',
    'Practice management software needs constant attention'
  ],
  ecommerce: [
    'Customer service across multiple channels',
    'Social media engagement and content creation',
    'Order processing and inventory management',
    'Campaign reporting and analytics'
  ],
  accounting: [
    'Data entry and reconciliations in Xero/MYOB',
    'BAS and compliance documentation',
    'Client communication and follow-ups',
    'Tax season is breaking our team'
  ],
  default: [
    'Administrative tasks taking too much time',
    'Customer service and support',
    'Data entry and management',
    'Process optimization needed'
  ]
};

export const PRACTICE_SYSTEMS = [
  'Best Practice',
  'Medical Director',
  'Cliniko',
  'Halaxy',
  'SimplePractice',
  'Power Diary',
  'Other/Custom system',
  'We use paper... help!'
];

export const COMPLIANCE_CONCERNS = [
  'AHPRA requirements',
  'Patient privacy (Privacy Act)',
  'Medicare compliance',
  'Clinical documentation standards',
  'All of the above!'
];

export const PATIENT_VOLUME_OPTIONS = [
  'Under 50 (small practice)',
  '50-150 (growing practice)',
  '150-300 (established)',
  '300+ (multi-practitioner)'
];

export const PLATFORM_OPTIONS = [
  'Shopify only',
  'WooCommerce',
  'Amazon + own store',
  'Multiple marketplaces (3+)',
  'Custom platform',
  'It\'s complicated...'
];

export const ORDER_VOLUME_OPTIONS = [
  'Startup (under 100/month)',
  'Growing (100-500/month)',
  'Scaling (500-2000/month)',
  'Established (2000+/month)'
];

export const BOTTLENECK_OPTIONS = [
  'Response time to inquiries',
  'Order status updates',
  'Returns/refunds process',
  'Product questions',
  'Technical support'
];

export const SOFTWARE_OPTIONS = [
  'Xero',
  'MYOB',
  'QuickBooks',
  'ATO Portal',
  'Excel/Google Sheets',
  'Other'
];

export const SERVICE_TYPES = [
  'Bookkeeping',
  'BAS Agent services',
  'Tax returns',
  'Payroll',
  'Advisory/CFO services'
];

export const PEAK_SEASON_OPTIONS = [
  'Work 80-hour weeks',
  'Turn away clients',
  'Hire expensive temps',
  'Miss deadlines',
  'We don\'t handle it well'
];

export const TEAM_PHILOSOPHY_OPTIONS: QuestionOption[] = [
  {
    value: 'family',
    label: 'Extension of our family - their success is our success',
    scoreModifier: 10
  },
  {
    value: 'partners',
    label: 'Professional partners who happen to be remote',
    scoreModifier: 7
  },
  {
    value: 'resources',
    label: 'Cost-effective resources to get work done',
    scoreModifier: 3
  },
  {
    value: 'cheap',
    label: 'Cheap labour to save money',
    scoreModifier: -10
  }
];

export const INVESTMENT_PRIORITIES = [
  'Long-term staff who know our business',
  'Lowest possible price',
  'Cultural fit with our team',
  'Investment in staff development',
  'Quick scaling up/down'
];

export const COMMUNITY_IMPACT_OPTIONS: QuestionOption[] = [
  {
    value: 'matters',
    label: 'Yes, and it matters to me where and how they work',
    scoreModifier: 10
  },
  {
    value: 'curious',
    label: 'I hadn\'t thought about it, tell me more',
    scoreModifier: 5
  },
  {
    value: 'not-concerned',
    label: 'Not really my concern if the work gets done',
    scoreModifier: -10
  }
];

export const PREVIOUS_EXPERIENCE_OPTIONS = [
  'Yes, but disappointed with high turnover',
  'Yes, but lacked personal connection',
  'No, this would be our first time',
  'Currently using freelancers (Upwork/Fiverr)',
  'Currently with another BPO'
];

export const WORKING_HOURS_OPTIONS = [
  'Australian business hours only',
  'Some overlap with ANZ hours',
  '24/7 coverage needed',
  'Flexible/project-based'
];

export const STARTING_TEAM_OPTIONS = [
  'Just 1 dedicated person to start',
  '2-3 person team',
  '4-6 person team',
  'Build as we go',
  'Not sure yet'
];

export const BUDGET_REALITY_OPTIONS: QuestionOption[] = [
  {
    value: 'aligned',
    label: 'That\'s what we budgeted',
    scoreModifier: 15
  },
  {
    value: 'higher-but-worth',
    label: 'Higher than expected but worth it for quality',
    scoreModifier: 10
  },
  {
    value: 'under-1000',
    label: 'We were hoping for under $1,000/month',
    scoreModifier: -5
  },
  {
    value: 'need-education',
    label: 'Need to understand the value better',
    scoreModifier: 0
  }
];

export const SKILL_PRIORITIES = {
  healthcare: [
    'Medical terminology knowledge',
    'Appointment scheduling',
    'Patient communication',
    'Insurance/Medicare processing',
    'Practice software expertise'
  ],
  ecommerce: [
    'E-commerce platform expertise',
    'Customer service excellence',
    'Social media management',
    'Order processing',
    'Content creation'
  ],
  accounting: [
    'Xero/MYOB proficiency',
    'Data entry accuracy',
    'Tax knowledge',
    'Client communication',
    'Compliance documentation'
  ],
  default: [
    'Customer service excellence',
    'Data entry accuracy',
    'Email management',
    'Phone communication',
    'Administrative support'
  ]
};

export const SCORING_THRESHOLDS = {
  hot: 70,
  warm: 50,
  nurture: 30,
  redirect: 0
};

export const REDIRECT_MESSAGE = {
  financial: 'We specialise in healthcare, digital, and creative businesses. For financial services support, we recommend exploring specialised providers.',
  cheap: 'Based on your priorities, you might find better matches with platforms like Upwork or Onlinejobs.ph for lowest-price options.',
  corporate: 'For corporate-scale operations, consider providers like Cloudstaff or Acquire BPO who specialise in large teams.'
};