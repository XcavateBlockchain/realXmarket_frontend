import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#4E4E4E',
        caption: '#A6A6A6',
        background: '#FFFFFF',
        foreground: '#717171',
        primary: {
          DEFAULT: '#3B4F74',
          200: '#DC7DA6',
          300: '#57A0C5',
          400: '#ECB278',
          foreground: '#4E4E4E'
        },
        x: 'linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: '#9678AE',
          200: '#457461',
          300: '#78B36E',
          400: '#DF8985',
          foreground: 'hsl(var(--accent-foreground))'
        },
        grey: {
          DEFAULT: '#F4F4F4'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        mona: ['var(--font-mona-sans)']
      },
      boxShadow: {
        filled: '0px 4px 0px 0px #3B4F74',
        outlined: '0px 4px 0px 0px rgba(59, 79, 116, 0.80)',
        'profile-card': '0px 1.532px 12.253px 0px rgba(0, 0, 0, 0.08)',
        'property-card': '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundImage: {
        'x-gradient':
          'linear-gradient(90deg, #ecb278 -25.47%, #dc7da6 35.16%, #3b4f74 69.39%, #57a0c5 103.47%)',
        profile: 'linear-gradient(90deg, #ED75A7 -16.18%, #43517A 60.86%, #3194BB 119.03%)',
        feature: '/images/feature_card.png'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
