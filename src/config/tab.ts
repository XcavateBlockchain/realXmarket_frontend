import { TabNavItem } from '@/types';

export interface DashboardConfig {
  developer: TabNavItem[];
  invertor: TabNavItem[];
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
      title: 'profile',
      href: '/developer',
      icon: '/icons/profile.svg'
    },
    {
      title: 'company',
      href: '/developer/company',
      icon: '/icons/company.svg'
    },
    {
      title: 'properties',
      href: '/developer/properties',
      icon: '/icons/portfolio.svg'
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
      title: 'wallet access',
      href: '/developer/wallet',
      icon: '/icons/bank.svg'
    },
    {
      title: 'message',
      href: '/developer/wallet',
      icon: '/icons/id.svg'
    }
  ]
};
