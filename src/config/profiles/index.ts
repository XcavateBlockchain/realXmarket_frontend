import { Company, IProfile, RealEstateInvestor } from '@/types';
import alice from './Alice T Investor-Legal Entity.json' assert { type: 'json' };
import bob from './Bob T Builder-Legal Entity.json' assert { type: 'json' };

type Profiles = {
  [key: string]: IProfile; // Index signature added here
};

export const profiles: Profiles = {
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY': alice,
  '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty': bob
};

const companies: Company[] = [
  {
    name: 'USA Developments Ltd',
    description: 'Developed over one hundred and fifty different developments all across USA.',
    logo: 'USA_Developments_logo.png',
    associationWebsite: 'www.worldconstruction.com',
    associationMembershipNumber: '012345XYZ',
    address: '565 The Aveneue',
    companyRegNumber: 7788866552,
    primaryContact: 'Chuck Usa',
    idDocs: ['chase_bank_statement.pdf', 'chase_utility_bill.pdf'],
    companyTelephone: 14455667788,
    companyEmail: 'chuck@usadevs.com'
  },
  {
    name: 'Sydney Developments Ltd',
    description:
      'Developed over two hundred and fifty different developments all across Australia.',
    logo: 'SydneyDevelopmentsLogo.jpg',
    associationWebsite: 'www.worldconstruction.com',
    associationMembershipNumber: '0111335UUU',
    address: '245 The Drive',
    companyRegNumber: 98898756656,
    primaryContact: 'Sydney Dee',
    idDocs: ['sydney_bank_statement.pdf', 'sydney_utility_bill.pdf'],
    companyTelephone: 2233090907,
    companyEmail: 'sales@sydneydev.com'
  }
];

export const realEstateInvestors: RealEstateInvestor[] = [
  {
    name: 'Eve Bee',
    address: '567 The Avenue',
    idDocs: ['EveBPassport.jpg', 'EveBUtility bill.pdf'],
    telephone: 7766888888,
    email: 'evebee@gmail.com',
    walletAddress: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    password: 'eve123'
  },
  {
    name: 'Charlie Brown',
    address: '678 The Avenue',
    idDocs: ['CharleBPassport.jpg', 'CharlieBUtility bill.pdf'],
    telephone: 7766777777,
    email: 'charliebrown@gmail.com',
    walletAddress: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
    password: 'charlie123'
  },
  {
    name: 'Dave Diggs',
    address: '890 The Avenue',
    idDocs: ['DaveDPassport.jpg', 'DaveDUtility bill.pdf'],
    telephone: 7798444444,
    email: 'bobajob@gmail.com',
    walletAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    password: 'dave123'
  }
];
