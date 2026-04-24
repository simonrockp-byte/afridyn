import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1628',
          800: '#0F2040',
          700: '#182E58',
          600: '#1C3A6E',
        },
        copper: {
          700: '#B85A1A',
          600: '#D4692A',
          500: '#E67817',
          400: '#F09040',
        },
        teal: {
          700: '#0A5C54',
          600: '#0D7A6F',
          500: '#1F857A',
          400: '#2EA89A',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(32px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        'hero-gradient': 'linear-gradient(135deg, #0A1628 0%, #0F2040 50%, #0A1628 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
        'dot': '24px 24px',
      }
    },
  },
  plugins: [],
}
export default config
