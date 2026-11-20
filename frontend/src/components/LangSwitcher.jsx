import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const languages = [
  { code: 'uz', label: 'UZ', flag: '🇺🇿' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export default function LangSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === i18nInstance.language) || languages[0];

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('manga-lang', code);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button className="icon-btn" onClick={() => setOpen(!open)}
        style={{ fontSize: '13px', fontWeight: '700', gap: '2px', width: 'auto', padding: '0 10px' }}>
        {current.flag} {current.label}
      </button>
      {open && (
        <div className="animate-fadeIn" style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '10px', overflow: 'hidden', minWidth: '100px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 1000
        }}>
          {languages.map(lang => (
            <button key={lang.code} onClick={() => changeLang(lang.code)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: '100%', padding: '10px 14px', background: 'none',
                border: 'none', color: i18nInstance.language === lang.code ? 'var(--primary)' : 'var(--text)',
                fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                transition: 'var(--transition)',
                borderBottom: lang.code !== 'en' ? '1px solid var(--border)' : 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
