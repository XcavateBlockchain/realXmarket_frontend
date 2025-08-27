import { TabNavItem } from '@/types';

export interface DashboardConfig {
  developer: TabNavItem[];
  invertor: TabNavItem[];
  agent: TabNavItem[];
}

export const tabConfig: DashboardConfig = {
  invertor: [
    {
      title: 'profile',
      href: '/profile',
      icon: '/icons/profile.svg'
    },
    {
      title: 'portfolio',
      href: '/profile/portfolio',
      icon: '/icons/portfolio.svg'
    },
    {
      title: 'loan',
      href: '/profile/loan',
      icon: '/icons/loan-pool.svg'
    },
    {
      title: 'transactions',
      href: '/profile/transactions',
      icon: '/icons/capital_purchase.svg'
    },
    {
      title: 'wallet access',
      href: '/profile/wallet',
      icon: '/icons/bank.svg'
    },
    {
      title: 'message',
      href: '/profile/wallet',
      icon: '/icons/id.svg'
    }
  ],
  developer: [
    {
      title: 'properties',
      href: '/developer/properties',
      icon: '/icons/portfolio.svg'
    },
    {
      title: 'profile',
      href: '/developer/profile',
      icon: '/icons/profile.svg'
    },
    {
      title: 'company',
      href: '/developer/company',
      icon: '/icons/company.svg'
    },

    {
      title: 'development loan',
      href: '/developer/loan',
      icon: '/icons/loan-pool.svg'
    },
    {
      title: 'transactions',
      href: '/developer/transactions',
      icon: '/icons/capital_purchase.svg'
    },
    {
      title: 'Account',
      href: '/developer/wallet',
      icon: '/icons/bank.svg'
    },
    {
      title: 'message',
      href: '/developer/wallet',
      icon: '/icons/id.svg'
    }
  ],
  agent: [
    {
      title: 'profile',
      href: '/agent',
      icon: '/icons/profile.svg'
    },
    {
      title: 'company',
      href: '/agent/company',
      icon: '/icons/company.svg'
    },
    {
      title: 'properties',
      href: '/agent/properties',
      icon: '/icons/portfolio.svg'
    },
    {
      title: 'transactions',
      href: '/agent/transactions',
      icon: '/icons/capital_purchase.svg'
    },
    {
      title: 'wallet access',
      href: '/agent/wallet',
      icon: '/icons/bank.svg'
    },
    {
      title: 'message',
      href: '/agent/wallet',
      icon: '/icons/id.svg'
    }
  ]
};
