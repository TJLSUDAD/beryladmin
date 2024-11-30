// Theme configuration and color constants
export const colors = {
  gold: {
    primary: '#ffd700',
    secondary: '#daa520',
    light: '#f4e5a9',
  },
  amber: {
    400: 'rgb(251 191 36)',
    500: 'rgb(245 158 11)',
    600: 'rgb(217 119 6)',
    700: 'rgb(180 83 9)',
    900: 'rgb(120 53 15)',
  },
} as const;

export const gradients = {
  logo: `linear-gradient(45deg, ${colors.gold.primary}, ${colors.gold.light}, ${colors.gold.secondary})`,
  button: `linear-gradient(to right, ${colors.amber[400]}, ${colors.amber[600]})`,
  buttonHover: `linear-gradient(to right, ${colors.amber[500]}, ${colors.amber[700]})`,
  diamond: `linear-gradient(45deg, ${colors.gold.primary}, ${colors.gold.secondary})`,
  background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
} as const;

export const animations = {
  shine: {
    keyframes: `
      @keyframes shine {
        0% { background-position: 0% center; }
        50% { background-position: 100% center; }
        100% { background-position: 0% center; }
      }
    `,
    config: {
      backgroundSize: '200% auto',
      animation: 'shine 3s linear infinite',
    },
  },
} as const;

export const shadows = {
  text: {
    gold: '0 0 30px rgba(218, 165, 32, 0.2)',
  },
} as const;