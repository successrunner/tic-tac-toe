export const lightTheme = {
  colors: {
    primary: '#4CAF50',
    primaryForeground: '#FFFFFF',
    background: '#E8F5E9',
    backgroundSecondary: '#C8E6C9',
    backgroundDestructive: '#FF5252',
    muted: '#E8F0E8',
    mutedForeground: '#2E7D32',
    card: '#FFFFFF',
    text: '#1B5E20',
    textSecondary: '#2E7D32',
    border: '#C6C6C8',
    shadow: '#1B5E20',
    shadowDestructive: '#B71C1C',
    notification: '#FF3B30',
  },
};

export const darkTheme = {
  colors: {
    primary: '#4CAF50',
    primaryForeground: '#FFFFFF',
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundDestructive: '#CF6679',
    muted: '#2C2C2C',
    mutedForeground: '#81C784',
    card: '#1C1C1E',
    text: '#E8F5E9',
    textSecondary: '#81C784',
    border: '#2C2C2C',
    shadow: '#ffffff',
    shadowDestructive: '#CF6679',
    notification: '#FF453A',
  },
};

export type Theme = typeof lightTheme;
