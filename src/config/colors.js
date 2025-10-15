// Global color palette for the Habit Tracking App
// Light theme with attractive, professional colors

export const colors = {
  // Primary colors
  primary: '#4F46E5', // Indigo - main brand color
  primaryLight: '#6366F1', // Lighter indigo for hovers
  primaryDark: '#3730A3', // Darker indigo for pressed states

  // Secondary colors
  secondary: '#10B981', // Emerald green
  secondaryLight: '#34D399',
  secondaryDark: '#059669',

  // Accent colors
  accent: '#F59E0B', // Amber
  accentLight: '#FCD34D',
  accentDark: '#D97706',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status colors
  success: '#10B981', // Green
  error: '#EF4444', // Red
  warning: '#F59E0B', // Amber
  info: '#3B82F6', // Blue

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Surface colors (for cards, modals, etc.)
  surface: '#FFFFFF',

  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    muted: '#9CA3AF', // Added for consistency
  },

  // Border colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
};

// Export individual colors for convenience
export const {
  primary,
  primaryLight,
  primaryDark,
  secondary,
  secondaryLight,
  secondaryDark,
  accent,
  accentLight,
  accentDark,
  white,
  black,
  gray,
  success,
  error,
  warning,
  info,
  background,
  surface,
  text,
  border,
  shadow,
  shadowDark,
} = colors;