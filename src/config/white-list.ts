type Partner = {
  name: string;
  title: string;
  background: string;
  bio: string;
  whitelistedAccountAddress: string;
};

type Developer = {
  name: string;
  address: string;
  website: string;
  summary: string;
  logo: string;
  partners: Partner[];
};

export const developers: Developer[] = [
  {
    name: 'Oak & Spire Developments Ltd.',
    address: '14 Willow Court, High Street, St Albans, Hertfordshire AL3 4DF, UK',
    website: 'www.oakandspire.co.uk',
    summary:
      "Oak & Spire Developments has over 25 years' experience in creating sustainable residential communities in Hertfordshire and North London. They specialise in restoring heritage buildings, blending modern luxury with historic charm, and delivering award-winning eco-homes with cutting-edge energy efficiency.",
    logo: 'https://app.realxmarket.io/images/logos/Oak_Spire_Logo.png',
    partners: [
      {
        name: 'Jonathan "Jon" Fairhurst',
        title: 'Managing Director',
        background: 'Chartered Surveyor with 25+ years in heritage property restoration.',
        bio: 'Jon founded Oak & Spire to combine his passion for historic architecture with sustainable modern building practices. He leads strategic land acquisition and oversees all major development projects.',
        whitelistedAccountAddress: '5EPBypXAjkQJyW3fRHuRoRbAmE97EDE386RttLBkHm6MC8ES'
      },
      {
        name: 'Amelia Rowe',
        title: 'Operations & Finance Director',
        background: 'Former corporate finance analyst in the construction sector.',
        bio: 'Amelia manages project budgets, investor relations, and operational efficiency, ensuring developments are delivered on time and within cost targets.',
        whitelistedAccountAddress: '5C84PwkYcCryRA1bD7Xh2ffJEPFyViqmmfewdfTzcCpA4nw3'
      }
    ]
  },
  {
    name: 'Thames Horizon Estates',
    address: '218 Riverside Quay, Greenwich, London SE10 9PT, UK',
    website: 'www.thameshorizon.co.uk',
    summary:
      'Thames Horizon Estates is a London-based developer known for large riverside regeneration projects. Their portfolio includes mixed-use high-rise schemes, boutique apartment blocks, and vibrant public spaces designed to foster community interaction and improve urban living standards.',
    logo: 'https://app.realxmarket.io/images/logos/Thames_Horizon_Logo.png',
    partners: [
      {
        name: 'Marcus Caldwell',
        title: 'Chief Executive Officer',
        background:
          'Civil engineer with experience in large-scale riverfront regeneration schemes in London and Rotterdam.',
        bio: "Marcus drives the company's vision for creating vibrant waterfront communities, liaising with architects, planners, and city authorities.",
        whitelistedAccountAddress: '5DnfwiFtfWtEm7SNKpu3RK52uLMcdfzEmkNfBPXYQWXbMqhX'
      },
      {
        name: 'Priya Sharma',
        title: 'Sales & Marketing Director',
        background: '15 years in luxury property sales across London and Dubai.',
        bio: 'Priya oversees brand strategy, off-plan sales campaigns, and international investor outreach for Thames Horizon Estates.',
        whitelistedAccountAddress: '5GgF5FL4TLKxmGRKiLqd382zUXCNhJ9vBy8p95nudT1EwsxV'
      }
    ]
  },
  {
    name: 'Maple Gate Homes',
    address: '52 Ashwell Park Drive, Watford, Hertfordshire WD25 7QL, UK',
    website: 'www.maplegatehomes.co.uk',
    summary:
      'Maple Gate Homes is a family-run developer with a strong focus on suburban family housing. With a reputation for timely delivery and a personal approach, they integrate landscaped parks, schools, and local amenities into every project to create well-connected neighbourhoods.',
    logo: 'https://app.realxmarket.io/images/logos/Maple_Gate_Logo.jpg',
    partners: [
      {
        name: 'Thomas "Tom" Kavanagh',
        title: 'Founder & Managing Director',
        background:
          'Family builder turned residential developer, with roots in Hertfordshire construction for over 30 years.',
        bio: 'Tom focuses on creating suburban family homes with strong community integration and sustainable build techniques.',
        whitelistedAccountAddress: '5HVTf7n7s2Tifw3whT3TdX7sh4uMr5b6RKMThZtatKYCTTnR'
      },
      {
        name: 'Emily Foster',
        title: 'Customer Experience Director',
        background: 'Former interior designer and property management consultant.',
        bio: 'Emily champions buyer satisfaction, managing the handover process and aftercare services for Maple Gate Homes developments.',
        whitelistedAccountAddress: '5DDZseMFYY31jpnqUsgRhwTtkHZgy72GNUs4ZdVr2y2QUBRH'
      }
    ]
  }
];

/**
 * Finds a developer based on a partner's whitelistedAccountAddress
 * @param whitelistedAddress - The whitelisted account address to search for
 * @returns The developer object if found, undefined otherwise
 */
export function findDeveloperByPartnerAddress(
  whitelistedAddress: string
): Developer | undefined {
  return developers.find(developer =>
    developer.partners.some(
      partner => partner.whitelistedAccountAddress === whitelistedAddress
    )
  );
}

/**
 * Finds all developers that have a partner with the specified whitelistedAccountAddress
 * @param whitelistedAddress - The whitelisted account address to search for
 * @returns Array of developer objects that match the criteria
 */
export function findAllDevelopersByPartnerAddress(whitelistedAddress: string): Developer[] {
  return developers.filter(developer =>
    developer.partners.some(
      partner => partner.whitelistedAccountAddress === whitelistedAddress
    )
  );
}
