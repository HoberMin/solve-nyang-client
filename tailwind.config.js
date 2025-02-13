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
        'fade-out': 'fadeOut 0.5s ease-out forwards',
        flip: 'flip 0.6s ease-in-out',
        match: 'match 0.3s ease-in-out forwards',
        'card-hover': 'cardHover 0.2s ease-in-out',
        'low-bounce': 'lowBounce 1s infinite',
        shake: 'shake 0.5s ease-in-out infinite',
        open: 'open 0.5s ease-in-out forwards',
        'shoot-arrow': 'shootArrow 0.8s ease-in-out',
        'box-explosion': 'boxExplosion 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        lowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        shake: {
          '0%, 100%': {
            transform:
              'translateX(-50%) translateY(-50%) scale(1.5) rotate(0deg)',
          },
          '25%': {
            transform:
              'translateX(-55%) translateY(-50%) scale(1.5) rotate(-5deg)',
          },
          '75%': {
            transform:
              'translateX(-45%) translateY(-50%) scale(1.5) rotate(5deg)',
          },
        },
        open: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) scale(1.5)' },
          '50%': { transform: 'translateX(-50%) translateY(-50%) scale(1.8)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) scale(1.5)' },
        },
        shootArrow: {
          '0%': {
            transform: 'translateX(-100%) translateY(-50%)',
            opacity: '0',
          },
          '20%': {
            opacity: '1',
          },
          '90%': {
            transform: 'translateX(180%) translateY(-50%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(180%) translateY(-50%)',
            opacity: '0',
          },
        },
        boxExplosion: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(2)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(7.2)',
            opacity: '0',
          },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        match: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cardHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
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
