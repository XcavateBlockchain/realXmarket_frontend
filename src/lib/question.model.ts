export interface Question {
  questionText: string;
  answers: string[];
  selectedAnswer?: number | null;
}

export interface QuestionnaireResponse {
  id?: string;
  userId?: string;
  account_address: string;
  questions: Question[];
  submittedAt: string;
  completedAt?: string;
}

export const getXcavateQuestions = (): Question[] => [
  {
    questionText: 'How long have you been involved in real estate development?',
    answers: ['Less than 1 year', '1 - 2 years', '3 - 5 years', 'More than 5 years']
  },
  {
    questionText: 'What type of real estate projects do you typically work on?',
    answers: ['Residential', 'Commercial', 'Mixed-use', 'Industrial']
  },
  {
    questionText: 'What is your primary role in real estate development?',
    answers: ['Developer', 'Investor', 'Contractor', 'Consultant']
  },
  {
    questionText: 'What is your annual investment budget?',
    answers: ['Under $100K', '$100K - $500K', '$500K - $1M', 'Over $1M']
  }
];
