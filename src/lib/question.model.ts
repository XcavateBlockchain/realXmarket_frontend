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
          'nvestment in unlisted shares (that is, shares that are not subject to trading on a stock exchange',
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
