import { useState, useRef, useEffect } from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FiDroplet } from 'react-icons/fi';
import '../styles/ThemeSwitcher.css';

const themeIcons = {
  crimson: '🔴',
  neon: '💙',
  sakura: '🌸',
  gold: '🌟',
  emerald: '💚',
};

export default function ThemeSwitcher() {
  const { themeName, setThemeName, theme } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="theme-switcher" ref={ref}>
      <button className="icon-btn theme-btn" onClick={() => setOpen(!open)} title={t('themes.title')}>
        <FiDroplet style={{ color: theme.primary }} />
      </button>

      {open && (
        <div className="theme-panel animate-fadeInUp">
          <div className="theme-panel-title">{t('themes.title')}</div>
          <div className="theme-grid">
            {Object.entries(themes).map(([key, th]) => (
              <button
                key={key}
                className={`theme-option ${themeName === key ? 'active' : ''}`}
                onClick={() => { setThemeName(key); setOpen(false); }}
                style={{ '--th-primary': th.primary, '--th-bg': th.bg }}
                title={th.name}
              >
                <div className="theme-preview" style={{ background: th.bg }}>
                  <div className="theme-preview-bar" style={{ background: th.gradient }} />
                  <div className="theme-preview-dots">
                    <span style={{ background: th.primary }} />
                    <span style={{ background: th.secondary }} />
                    <span style={{ background: th.accent }} />
                  </div>
                </div>
                <div className="theme-name">
                  <span className="theme-emoji">{themeIcons[key]}</span>
                  <span>{th.name}</span>
                </div>
                {themeName === key && <div className="theme-active-badge">✓</div>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
