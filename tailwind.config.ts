// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

// Client theme configuration - This can be changed for each client
const clientTheme = {
  colors: {
    // Base colors
    primary: '#3B82F6', // Default blue
    primaryDark: '#2563EB',
    secondary: '#10B981', // Default green
    accent: '#F59E0B', // Default amber
    
    // UI colors - automatically adapted for dark mode
    background: {
      light: '#FFFFFF',
      dark: '#0F172A',
    },
    foreground: {
      light: '#1E293B',
      dark: '#F8FAFC',
    },
    muted: {
      light: '#F1F5F9',
      dark: '#1E293B',
    },
    border: {
      light: '#E2E8F0',
      dark: '#334155',
    },
  },
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
};

// To customize, edit values in clientTheme above - don't modify below unless extending functionality
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Map client theme colors to Tailwind
        primary: {
          DEFAULT: clientTheme.colors.primary,
          dark: clientTheme.colors.primaryDark,
        },
        secondary: {
          DEFAULT: clientTheme.colors.secondary,
        },
        accent: {
          DEFAULT: clientTheme.colors.accent,
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        ...clientTheme.borderRadius,
      },
      fontFamily: {
        sans: [clientTheme.fonts.body, ...fontFamily.sans],
        heading: [clientTheme.fonts.heading, ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;