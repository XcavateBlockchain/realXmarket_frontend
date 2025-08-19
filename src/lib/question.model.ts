export interface Question {
  heading: string;
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
  result?: 'Pass' | 'Warning' | 'Fail';
  section1Result?: 'Pass' | 'Fail';
  section2Result?: 'Pass' | 'Warning' | 'Fail';
  hasAgreedToTerms?: boolean;
  acceptedAt?: string;
}

// Predefined questions structure
export const QUESTIONNAIRE_DATA = {
  section1: [
    {
      heading:
        'H&W Investments Limited does not provide any advice relating to investment into any real estate assets listed on the Xcavate realXmarket application. If you are unsure whether investment via the Xcavate realXmarket application is right for you, you should seek financial advice.',
      questionText:
        'Please confirm you understand that H&W Investments Limited has not provided you with any form of investment advice relating to investment via the Xcavate realXmarket application',
      answers: ['Yes', 'No']
    },
    {
      heading:
        'Investment via the Xcavate realXmarket application involves the purchase of property tokens. Each token represents a single share in a Limited Liability Partnership (LLP) known as a “Special Purpose Vehicle” (SPV). The SPV will acquire the real estate asset as marketed on the platform.',
      questionText: 'Please confirm you understand the above explanation.  ',
      answers: ['Yes', 'No']
    },
    {
      heading:
        'Property tokens purchased via Xcavate realxmarket may be resold via the noticeboard section within the application. However, these tokens are not as liquid as, for example, shares that are listed on a stock exchange. As such, you might not be able to find a buyer for your token(s) should you wish to sell, and where you are able to, this might take some time.',
      questionText:
        'Please confirm you have understood this and that you are only investing money you are able to lock away for a period of time without having access to',
      answers: ['Yes', 'No']
    },
    {
      heading:
        'The value of your property tokens is linked to the value of the specific real estate asset owned by the SPV. The property market can be subject to fluctuations in value, and you should view any investment in real estate as a medium to long term investment. It is possible that you could lose some or all of your money in the event of a market downturn.',
      questionText:
        'Please confirm you have understood that investment into real estate assets should be viewed as a medium to long term investment and that you could lose some or all of your money',
      answers: ['Yes', 'No']
    },
    {
      heading:
        'The rental yield on your property tokens may vary depending on market conditions and could cease completely if the property is vacant.',
      questionText:
        'Please confirm you have understood that rental yield can vary and may cease altogether in the event that the property is vacant for any period of time and that you are able to withstand the financial impact of any reduction in rental yield.',
      answers: ['Yes', 'No']
    }
  ],
  section2: {
    experience: [
      {
        heading: 'Please indicate your level of experience and knowledge in relation to:',
        questionText: 'Investment into real estate (property)',
        answers: ['High', 'Medium', 'Low', 'None']
      },
      {
        heading: 'Please indicate your level of experience and knowledge in relation to:',
        questionText:
          'Investment in unlisted shares (that is, shares that are not subject to trading on a stock exchange)',
        answers: ['High', 'Medium', 'Low', 'None']
      },
      {
        heading: 'Please indicate your level of experience and knowledge in relation to:',
        questionText: 'Investment in Crypto assets',
        answers: ['High', 'Medium', 'Low', 'None']
      }
    ],
    transactions: [
      {
        heading:
          'Please indicate the number of transactions you have undertaken in the past five years involving:',
        questionText: 'Investment into real estate (property)',
        answers: ['Over 5', '1 to 5', 'None']
      },
      {
        heading:
          'Please indicate the number of transactions you have undertaken in the past five years involving:',
        questionText:
          'Investment in unlisted shares (that is, shares that are not subject to trading on a stock exchange',
        answers: ['Over 5', '1 to 5', 'None']
      },
      {
        heading:
          'Please indicate the number of transactions you have undertaken in the past five years involving:',
        questionText: 'Investment in Crypto  assets',
        answers: ['Over 5', '1 to 5', 'None']
      }
    ]
  }
};

export const getXcavateQuestions = (): Question[] => [
  ...QUESTIONNAIRE_DATA.section1,
  ...QUESTIONNAIRE_DATA.section2.experience,
  ...QUESTIONNAIRE_DATA.section2.transactions
];

export const EXPERIENCE_LOGIC = [
  ['High', 'High', 'High', 'Pass'],
  ['High', 'High', 'Medium', 'Pass'],
  ['High', 'High', 'Low', 'Pass'],
  ['High', 'High', 'None', 'Pass'],
  ['High', 'Medium', 'High', 'Pass'],
  ['High', 'Medium', 'Medium', 'Pass'],
  ['High', 'Medium', 'Low', 'Pass'],
  ['High', 'Medium', 'None', 'Pass'],
  ['High', 'Low', 'High', 'Warning'],
  ['High', 'Low', 'Medium', 'Warning'],
  ['High', 'Low', 'Low', 'Warning'],
  ['High', 'Low', 'None', 'Warning'],
  ['High', 'None', 'High', 'Warning'],
  ['High', 'None', 'Medium', 'Warning'],
  ['High', 'None', 'Low', 'Warning'],
  ['High', 'None', 'None', 'Warning'],
  ['Medium', 'High', 'High', 'Pass'],
  ['Medium', 'High', 'Medium', 'Pass'],
  ['Medium', 'High', 'Low', 'Pass'],
  ['Medium', 'High', 'None', 'Pass'],
  ['Medium', 'Medium', 'High', 'Pass'],
  ['Medium', 'Medium', 'Medium', 'Pass'],
  ['Medium', 'Medium', 'Low', 'Pass'],
  ['Medium', 'Medium', 'None', 'Pass'],
  ['Medium', 'Low', 'High', 'Warning'],
  ['Medium', 'Low', 'Medium', 'Warning'],
  ['Medium', 'Low', 'Low', 'Warning'],
  ['Medium', 'Low', 'None', 'Warning'],
  ['Medium', 'None', 'High', 'Warning'],
  ['Medium', 'None', 'Medium', 'Warning'],
  ['Medium', 'None', 'Low', 'Warning'],
  ['Medium', 'None', 'None', 'Warning'],
  ['Low', 'High', 'High', 'Pass'],
  ['Low', 'High', 'Medium', 'Pass'],
  ['Low', 'High', 'Low', 'Pass'],
  ['Low', 'High', 'None', 'Pass'],
  ['Low', 'Medium', 'High', 'Pass'],
  ['Low', 'Medium', 'Medium', 'Pass'],
  ['Low', 'Medium', 'Low', 'Warning'],
  ['Low', 'Medium', 'None', 'Warning'],
  ['Low', 'Low', 'High', 'Warning'],
  ['Low', 'Low', 'Medium', 'Warning'],
  ['Low', 'Low', 'Low', 'Fail'],
  ['Low', 'Low', 'None', 'Fail'],
  ['Low', 'None', 'High', 'Fail'],
  ['Low', 'None', 'Medium', 'Fail'],
  ['Low', 'None', 'Low', 'Fail'],
  ['Low', 'None', 'None', 'Fail'],
  ['None', 'High', 'High', 'Pass'],
  ['None', 'High', 'Medium', 'Pass'],
  ['None', 'High', 'Low', 'Warning'],
  ['None', 'High', 'None', 'Warning'],
  ['None', 'Medium', 'High', 'Warning'],
  ['None', 'Medium', 'Medium', 'Warning'],
  ['None', 'Medium', 'Low', 'Warning'],
  ['None', 'Medium', 'None', 'Warning'],
  ['None', 'Low', 'High', 'Warning'],
  ['None', 'Low', 'Medium', 'Warning'],
  ['None', 'Low', 'Low', 'Fail'],
  ['None', 'Low', 'None', 'Fail'],
  ['None', 'None', 'High', 'Fail'],
  ['None', 'None', 'Medium', 'Fail'],
  ['None', 'None', 'Low', 'Fail'],
  ['None', 'None', 'None', 'Fail']
];

export const TRANSACTION_LOGIC = [
  ['Over 5', 'Over 5', 'Over 5', 'Pass'],
  ['Over 5', 'Over 5', '1 to 5', 'Pass'],
  ['Over 5', 'Over 5', 'None', 'Pass'],
  ['Over 5', '1 to 5', 'Over 5', 'Pass'],
  ['Over 5', '1 to 5', '1 to 5', 'Pass'],
  ['Over 5', '1 to 5', 'None', 'Pass'],
  ['Over 5', 'None', 'Over 5', 'Warning'],
  ['Over 5', 'None', '1 to 5', 'Warning'],
  ['Over 5', 'None', 'None', 'Warning'],
  ['1 to 5', 'Over 5', 'Over 5', 'Pass'],
  ['1 to 5', 'Over 5', '1 to 5', 'Pass'],
  ['1 to 5', 'Over 5', 'None', 'Pass'],
  ['1 to 5', '1 to 5', 'Over 5', 'Warning'],
  ['1 to 5', '1 to 5', '1 to 5', 'Warning'],
  ['1 to 5', '1 to 5', 'None', 'Warning'],
  ['1 to 5', 'None', 'Over 5', 'Warning'],
  ['1 to 5', 'None', '1 to 5', 'Warning'],
  ['1 to 5', 'None', 'None', 'Warning'],
  ['None', 'Over 5', 'Over 5', 'Pass'],
  ['None', 'Over 5', '1 to 5', 'Pass'],
  ['None', 'Over 5', 'None', 'Fail'],
  ['None', '1 to 5', 'Over 5', 'Warning'],
  ['None', '1 to 5', '1 to 5', 'Warning'],
  ['None', '1 to 5', 'None', 'Warning'],
  ['None', 'None', 'Over 5', 'Warning'],
  ['None', 'None', '1 to 5', 'Fail'],
  ['None', 'None', 'None', 'Fail']
];

// Evaluation helper functions
export function evaluateSection1(questions: Question[]): 'Pass' | 'Fail' {
  // All section 1 questions must be "Yes" (index 0) to pass
  for (const question of questions) {
    if (question.selectedAnswer !== 0) {
      return 'Fail';
    }
  }
  return 'Pass';
}

export function evaluateSection2Experience(
  experienceAnswers: string[]
): 'Pass' | 'Warning' | 'Fail' {
  const matchingRule = EXPERIENCE_LOGIC.find(
    rule =>
      rule[0] === experienceAnswers[0] &&
      rule[1] === experienceAnswers[1] &&
      rule[2] === experienceAnswers[2]
  );
  return (matchingRule?.[3] as 'Pass' | 'Warning' | 'Fail') || 'Fail';
}

export function evaluateSection2Transactions(
  transactionAnswers: string[]
): 'Pass' | 'Warning' | 'Fail' {
  const matchingRule = TRANSACTION_LOGIC.find(
    rule =>
      rule[0] === transactionAnswers[0] &&
      rule[1] === transactionAnswers[1] &&
      rule[2] === transactionAnswers[2]
  );
  return (matchingRule?.[3] as 'Pass' | 'Warning' | 'Fail') || 'Fail';
}

export function combineResults(
  section1Result: 'Pass' | 'Fail',
  experienceResult: 'Pass' | 'Warning' | 'Fail',
  transactionResult: 'Pass' | 'Warning' | 'Fail'
): 'Pass' | 'Warning' | 'Fail' {
  // If section 1 fails, overall result is fail
  if (section1Result === 'Fail') return 'Fail';

  // If either section 2 part fails, overall result is fail
  if (experienceResult === 'Fail' || transactionResult === 'Fail') return 'Fail';

  // If either section 2 part is warning, overall result is warning
  if (experienceResult === 'Warning' || transactionResult === 'Warning') return 'Warning';

  // Otherwise, pass
  return 'Pass';
}

export const TermsServiceAgreementMessages = {
  pass: 'Thank you for passing our questionnaire, please accept our privacy, terms & agreement to start investing',
  warning:
    'Thank you for taking our questionnaire, you may not be suitable for this type of investing. Are you sure you still wish to proceed? If Yes... please accept our privacy, terms and agreement to start investing',
  fail: 'Unfortunately, based on the answers you have given, we believe it is unlikely that this investment will be appropriate for you and we will not therefore be able to register you as a customer'
};
