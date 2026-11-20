import { createContext, useContext, useState, useEffect } from 'react';

export const themes = {
  crimson: {
    name: 'Crimson Night',
    primary: '#e63946',
    secondary: '#ff6b6b',
    accent: '#ffd60a',
    bg: '#0a0a0f',
    bgCard: '#13131a',
    bgNav: '#0d0d14',
    text: '#f1f1f1',
    textMuted: '#888',
    border: '#2a2a3a',
    gradient: 'linear-gradient(135deg, #e63946, #c1121f)',
    glow: '0 0 30px rgba(230,57,70,0.4)',
  },
  neon: {
    name: 'Neon Cyber',
    primary: '#00f5ff',
    secondary: '#7b2fff',
    accent: '#ff00aa',
    bg: '#010008',
    bgCard: '#0a0015',
    bgNav: '#05000f',
    text: '#e0e0ff',
    textMuted: '#7070aa',
    border: '#1a0a3a',
    gradient: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
    glow: '0 0 30px rgba(0,245,255,0.4)',
  },
  sakura: {
    name: 'Sakura Dream',
    primary: '#ff6eb4',
    secondary: '#ff9de2',
    accent: '#ffd700',
    bg: '#0f0a12',
    bgCard: '#1a1020',
    bgNav: '#120d18',
    text: '#fdf0f8',
    textMuted: '#9980aa',
    border: '#2d1a3a',
    gradient: 'linear-gradient(135deg, #ff6eb4, #c056a8)',
    glow: '0 0 30px rgba(255,110,180,0.4)',
  },
  gold: {
    name: 'Dark Gold',
    primary: '#ffd60a',
    secondary: '#ffaa00',
    accent: '#ff6b35',
    bg: '#080600',
    bgCard: '#120f00',
    bgNav: '#0d0a00',
    text: '#fff8e1',
    textMuted: '#8a7a40',
    border: '#2a2000',
    gradient: 'linear-gradient(135deg, #ffd60a, #ff8c00)',
    glow: '0 0 30px rgba(255,214,10,0.4)',
  },
  emerald: {
    name: 'Emerald Shadow',
    primary: '#00e676',
    secondary: '#00bfa5',
    accent: '#76ff03',
    bg: '#00080a',
    bgCard: '#001510',
    bgNav: '#000f08',
    text: '#e0fff5',
    textMuted: '#40806a',
    border: '#003a25',
    gradient: 'linear-gradient(135deg, #00e676, #00897b)',
    glow: '0 0 30px rgba(0,230,118,0.4)',
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() =>
    localStorage.getItem('manga-theme') || 'crimson'
  );

  const theme = themes[themeName];

  useEffect(() => {
    localStorage.setItem('manga-theme', themeName);
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--bg-nav', theme.bgNav);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--gradient', theme.gradient);
    root.style.setProperty('--glow', theme.glow);
  }, [themeName, theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
