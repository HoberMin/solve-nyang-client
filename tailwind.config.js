/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        neo: ['NeoDunggeunmo', 'sans-serif'],
      },
      animation: {
        'low-bounce': 'lowBounce 1s infinite',
        shake: 'shake 0.5s ease-in-out infinite',
        open: 'open 0.5s ease-in-out forwards',
      },
      keyframes: {
        lowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(-50%)' },
          '25%': { transform: 'translateX(-60%) translateY(-50%)' },
          '75%': { transform: 'translateX(-40%) translateY(-50%)' },
        },
        open: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) scale(1)' },
          '50%': { transform: 'translateX(-50%) translateY(-50%) scale(1.2)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) scale(1)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
