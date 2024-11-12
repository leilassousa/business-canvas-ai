// src/components/BusinessForm/questions.ts

import { Question, Section } from '@/lib/types';

export const sections: Section[] = [
  'Problem',
  'Audience',
  'Competitors',
  'Channels',
  'Elevator Pitch',
  'Differentiator',
  'Solution',
  'Costs',
  'Revenue',
  'Business Boosters',
  'Personal Fit'
];

export const questions: Question[] = [
  // Problem Section
  {
    id: 'problem-1',
    section: 'Problem',
    preamble: 'Every business solves problems, and understanding the challenges your customers face is key to serving them better.',
    questionText: 'What are the biggest frustrations or obstacles your customers deal with regularly? Think about what might keep them up at night or make their day harder.',
    type: 'textarea'
  },
  {
    id: 'problem-2',
    section: 'Problem',
    questionText: 'Are there problems they arere currently paying someone else to help them solve? If so, what are they?',
    type: 'textarea'
  },

  // Audience Section
  {
    id: 'audience-1',
    section: 'Audience',
    preamble: 'Getting to know your ideal customers can help you connect with them more effectively.',
    questionText: 'Who do you imagine your typical customer is? Consider their age, location, and profession, if that applies.',
    type: 'textarea'
  },
  {
    id: 'audience-2',
    section: 'Audience',
    questionText: 'What do they care deeply about or value most?',
    type: 'textarea'
  },
  {
    id: 'audience-3',
    section: 'Audience',
    questionText: 'What are their future goals or aspirations? What are they working towards?',
    type: 'textarea'
  },

  // Competitors Section
  {
    id: 'competitors-1',
    section: 'Competitors',
    preamble: 'Understanding your competition helps you see where you can stand out.',
    questionText: 'Who else is serving your audience? Can you name a few companies or brands your customers might also turn to?',
    type: 'textarea'
  },
  {
    id: 'competitors-2',
    section: 'Competitors',
    questionText: 'What do these competitors do well that you admire? And where do they fall short?',
    type: 'textarea'
  },

  // Channels Section
  {
    id: 'channels-1',
    section: 'Channels',
    preamble: 'Knowing where your customers spend their time helps you reach them in the right places.',
    questionText: 'Where does your ideal customer typically spend their time? Are they mostly online or offline?',
    type: 'textarea'
  },
  {
    id: 'channels-2',
    section: 'Channels',
    questionText: 'What social media platforms or websites do they use regularly?',
    type: 'textarea'
  },
  {
    id: 'channels-3',
    section: 'Channels',
    questionText: 'How do you keep in touch with your audience? For example, through newsletters or other forms of communication?',
    type: 'textarea'
  },

  // Elevator Pitch Section
  {
    id: 'elevator-pitch-1',
    section: 'Elevator Pitch',
    preamble: 'An elevator pitch is a quick way to introduce your business. Let us create a sentence that sums up what you do and why it matters.',
    questionText: 'If you had to explain your business in one sentence, how would you describe who you help, what problem you solve, and how you do it differently than others?',
    type: 'textarea'
  },

  // Differentiator Section
  {
    id: 'differentiator-1',
    section: 'Differentiator',
    preamble: 'Being unique is essential in a crowded market. Let us define what sets you apart.',
    questionText: 'What is unique or different about your approach, product, or service?',
    type: 'textarea'
  },
  {
    id: 'differentiator-2',
    section: 'Differentiator',
    questionText: 'How does your business stand out from your competitors?',
    type: 'textarea'
  },

  // Solution Section
  {
    id: 'solution-1',
    section: 'Solution',
    preamble: 'Now, let us explore how your business solves customer problems.',
    questionText: 'Imagine your solution working perfectly for your customer. What does that look like?',
    type: 'textarea'
  },
  {
    id: 'solution-2',
    section: 'Solution',
    questionText: 'How does your solution address the main issues your customers face?',
    type: 'textarea'
  },
  {
    id: 'solution-3',
    section: 'Solution',
    questionText: 'What benefits do customers gain from using your product or service?',
    type: 'textarea'
  },

  // Costs Section
  {
    id: 'costs-1',
    section: 'Costs',
    preamble: 'Running a business comes with costs. It is helpful to think about them now so you can plan accordingly.',
    questionText: 'What are some of the main costs you expect for building and delivering your solution? Will these be monthly, yearly, or one-time expenses?',
    type: 'textarea'
  },
  {
    id: 'costs-2',
    section: 'Costs',
    questionText: 'Do you plan to hire contractors or employees to help you?',
    type: 'textarea'
  },

  // Revenue Section
  {
    id: 'revenue-1',
    section: 'Revenue',
    preamble: 'Let us think about how you will make money from your business.',
    questionText: 'What will you be selling to your customers to solve their problems?',
    type: 'textarea'
  },
  {
    id: 'revenue-2',
    section: 'Revenue',
    questionText: 'How much do you plan to charge for it?',
    type: 'textarea'
  },

  // Business Boosters Section
  {
    id: 'business-boosters-1',
    section: 'Business Boosters',
    preamble: 'Every business has strengths. Letus identify yours.',
    questionText: 'What advantages does your business have over others? These could be relationships, resources, or skills that are hard to copy.',
    type: 'textarea'
  },

  // Personal Fit Section
  {
    id: 'personal-fit-1',
    section: 'Personal Fit',
    preamble: 'Building a business is a big commitment, so it is essential to make sure it feels like the right fit for you.',
    questionText: 'Does this business align with the kind of lifestyle you want? Does it excite and energize you, or do you feel it might wear you down over time?',
    type: 'textarea'
  }
];

// New helper functions for question-by-question navigation
export const getAllQuestions = (): Question[] => {
  return questions;
};

export const getTotalQuestions = (): number => {
  return questions.length;
};

export const getQuestionIndex = (questionId: string): number => {
  return questions.findIndex(q => q.id === questionId);
};

export const getCurrentQuestion = (questionId: string): Question | null => {
  return questions.find(q => q.id === questionId) || null;
};

export const getNextQuestion = (currentQuestionId: string): Question | null => {
  const currentIndex = getQuestionIndex(currentQuestionId);
  return currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;
};

export const getPreviousQuestion = (currentQuestionId: string): Question | null => {
  const currentIndex = getQuestionIndex(currentQuestionId);
  return currentIndex > 0 ? questions[currentIndex - 1] : null;
};

// Get the first question of the form
export const getFirstQuestion = (): Question => {
  return questions[0];
};

// Get the last question of the form
export const getLastQuestion = (): Question => {
  return questions[questions.length - 1];
};

// Optional: Keep section-related functions for progress tracking
export const getQuestionsBySection = (section: Section): Question[] => {
  return questions.filter(q => q.section === section);
};

export const getTotalSections = (): number => {
  return sections.length;
};

export const getSectionIndex = (section: Section): number => {
  return sections.indexOf(section);
};

// Helper to get progress percentage
export const getProgressPercentage = (currentQuestionId: string): number => {
  const currentIndex = getQuestionIndex(currentQuestionId);
  return Math.round(((currentIndex + 1) / questions.length) * 100);
};

// Helper to check if it's the last question
export const isLastQuestion = (questionId: string): boolean => {
  return getQuestionIndex(questionId) === questions.length - 1;
};

// Helper to check if it's the first question
export const isFirstQuestion = (questionId: string): boolean => {
  return getQuestionIndex(questionId) === 0;
};

export const getNextSection = (currentSection: Section): Section | null => {
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
};

export const getPreviousSection = (currentSection: Section): Section | null => {
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
};

console.log('Questions loaded:', questions.length);
console.log('Sections available:', sections.length);