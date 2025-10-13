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
      title: 'FAQ',
      href: '/#faq'
    },
    {
      title: 'HELP',
      href: '/#help'
    },
    {
      title: 'DOCS',
      href: 'https://xcavate-1.gitbook.io/xcavate-protocol/applications/xcavate-dapp'
    }
  ],

  links: {
    twitter: '',
    discord: '',
    telegram: ''
  },

  whyChoose: [
    {
      title: 'Lower barrier to entry',
      icon: '/svgs/realXmarket_low-barrier-to-entry.svg'
    },
    {
      title: 'Simplicity and automation',
      icon: '/svgs/realXmarket_simplicity-and-automation.svg'
    },
    {
      title: 'Security and transparency',
      icon: '/svgs/realXmarket_security-and-transparency.svg'
    },
    {
      title: 'Access to global investments',
      icon: '/svgs/realXmarket_access-to-global-investments.svg'
    },
    {
      title: 'All-in-one ecosystem',
      icon: '/svgs/realXmarket_all-in-one-ecosystem.svg'
    },
    {
      title: 'Real-time insights',
      icon: '/svgs/realXmarket_real-time-insights.svg'
    }
  ],

  features: [
    {
      title: 'Property Developers',
      description:
        'Owners and developers listing their properties go through verification processes, which provide reassurances for investors. Our tamper-proof blockchain tech and tokenisation processes build transparency and mutual trust.',
      image: '/svgs/realXmarket_property-developer_image.png',
      text: 'Ready to raise capital faster? List your next project on realXmarket and connect with global investors today'
    },
    {
      title: 'Property Investors',
      description:
        'realXmarket opens up property investment to everyone. With tokenised real estate, you can invest in verified opportunities with low entry thresholds, diversify your portfolio and manage it all from your phone – securely and effortlessly.',
      image: '/svgs/realXmarket_property-Investor-Image.png',
      text: 'Start building your property portfolio today. Download the realXmarket app and invest in real estate with ease'
    },
    {
      title: 'Service Providers',
      description:
        'Lawyers, letting agents, and property managers who add genuie value to realXmarket are also welcomed into our community. Gain visibility, generate leads automatically and position your business at the heart of the future property economy.',
      image: '/svgs/realXmarket_service-provider-Image.png',
      text: 'Connect with more projects and grow your client base join realXmarket today'
    }
  ]
};

export type SiteConfig = typeof siteConfig;
