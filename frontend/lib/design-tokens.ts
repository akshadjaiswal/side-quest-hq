// Design tokens for SideQuestHQ - Warm Neutral Theme
export const colors = {
  // Primary warm neutrals
  background: {
    primary: '#FDFCFB',      // Warm white
    secondary: '#F9F7F4',    // Cream
    tertiary: '#F5F1E8',     // Light beige
  },

  // Text colors
  text: {
    primary: '#292524',      // Rich brown (stone-800)
    secondary: '#57534E',    // Medium brown (stone-600)
    tertiary: '#78716C',     // Light brown (stone-500)
    muted: '#A8A29E',        // Very light brown (stone-400)
  },

  // Accent colors
  accent: {
    primary: '#D97706',      // Warm amber-600
    hover: '#B45309',        // Amber-700
    light: '#FEF3C7',        // Amber-100
  },

  // Status colors
  status: {
    active: '#059669',       // Emerald-600
    activeLight: '#D1FAE5',  // Emerald-100

    paused: '#EA580C',       // Orange-600
    pausedLight: '#FFEDD5',  // Orange-100

    abandoned: '#78716C',    // Stone-500
    abandonedLight: '#E7E5E4', // Stone-200

    shipped: '#2563EB',      // Blue-600
    shippedLight: '#DBEAFE', // Blue-100
  },

  // Graveyard theme
  graveyard: {
    background: '#2E1065',   // Deep purple-900
    backgroundLight: '#4C1D95', // Purple-800
    text: '#E9D5FF',         // Purple-200
    accent: '#A78BFA',       // Purple-400
    sepia: '#92400E',        // Amber-800 (for sepia overlay)
  },

  // Border & dividers
  border: {
    light: '#E7E5E4',        // Stone-200
    medium: '#D6D3D1',       // Stone-300
    dark: '#A8A29E',         // Stone-400
  },
}

// Typography scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
}

// Spacing (based on 4px grid)
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
}

// Border radius
export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
}

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
}

// Animation durations
export const animation = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
}
