export const siteConfig = {
  name: 'RealXDeal',
  url: '',
  ogImage: '',
  description: '',
  mainNav: [
    {
      title: 'MARKETPLACE',
      href: '/marketplace'
    },
    {
      title: 'LOANS',
      href: '/#loans'
    },
    {
      title: 'STAKING',
      href: '/#staking'
    },
    {
      title: 'DOCUMENTS',
      href: '/documents'
    }
  ],

  links: {
    twitter: '',
    discord: '',
    telegram: ''
  }
};

export type SiteConfig = typeof siteConfig;
