/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        accent: '#22d3ee',
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 211, 238, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 20%, rgba(79,70,229,0.35), transparent 38%), radial-gradient(circle at 80% 25%, rgba(34,211,238,0.35), transparent 35%), radial-gradient(circle at 50% 80%, rgba(236,72,153,0.25), transparent 42%)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
};
