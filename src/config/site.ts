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
      icon: '/svgs/realXmarket_lower-barrier-to-entry.png'
    },
    {
      title: 'Simplicity and automation',
      icon: '/svgs/realXmarket_simplicity-and-automation.png'
    },
    {
      title: 'Security and transparency',
      icon: '/svgs/realXmarket_security-and-transparency.png'
    },
    {
      title: 'Access to global investments',
      icon: '/svgs/realXmarket_access-to-global-investments.png'
    },
    {
      title: 'All-in-one ecosystem',
      icon: '/svgs/realXmarket_all-in-one-ecosystem.png'
    },
    {
      title: 'Real-time insights',
      icon: '/svgs/realXmarket_real-time-insights.png'
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
        'Verified lawyers, letting agents and property managers help deliver real value to the realXmarket and form part of the network. As their contribution grows, so does the value generated through the network effects.',
      image: '/svgs/realXmarket_service-provider-Image.png',
      text: 'Connect with more projects and grow your client base join realXmarket today'
    }
  ]
};

export type SiteConfig = typeof siteConfig;
