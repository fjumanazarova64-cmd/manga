import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiZap } from 'react-icons/fi';
import '../styles/AuthPage.css';

// Floating particle component
function Particle({ style }) {
  return <div className="auth-particle" style={style} />;
}

// Manga panel decoration (like manga frames)
function MangaPanels() {
  const panels = [
    { title: 'One Piece', emoji: '☠️', desc: '1100+ bob' },
    { title: 'Attack on Titan', emoji: '⚔️', desc: 'Tugadi' },
    { title: 'Jujutsu Kaisen', emoji: '👁️', desc: 'Yangi boblar!' },
    { title: 'Solo Leveling', emoji: '🗡️', desc: 'Top 1' },
  ];
  return (
    <div className="manga-panels-deco">
      {panels.map((p, i) => (
        <div key={i} className="deco-panel" style={{ animationDelay: `${i * 0.3}s` }}>
          <span className="deco-emoji">{p.emoji}</span>
          <div>
            <div className="deco-title">{p.title}</div>
            <div className="deco-desc">{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AuthPage({ mode = 'login' }) {
  const { t } = useTranslation();
  const { login, register, loading } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPass: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(0); // animation step
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const ps = Array.from({ length: 20 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 8}s`,
      background: i % 3 === 0 ? theme.primary : i % 3 === 1 ? theme.secondary : theme.accent,
      borderRadius: i % 2 === 0 ? '50%' : '2px',
    }));
    setParticles(ps);

    // Stagger animation
    setTimeout(() => setStep(1), 100);
    setTimeout(() => setStep(2), 400);
    setTimeout(() => setStep(3), 700);
  }, [theme.primary, theme.secondary, theme.accent]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        if (!form.email || !form.password) { setError('Email va parolni kiriting!'); return; }
        await login(form.email, form.password);
      } else {
        if (!form.username || !form.email || !form.password) { setError('Barcha maydonlarni to\'ldiring!'); return; }
        if (form.password !== form.confirmPass) { setError('Parollar mos kelmadi!'); return; }
        if (form.password.length < 6) { setError('Parol kamida 6 ta belgi bo\'lishi kerak!'); return; }
        await register(form.username, form.email, form.password);
      }
      navigate('/');
    } catch {
      setError('Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  };

  const handleGuest = () => {
    login('guest@mangauz.uz', 'guest123').then(() => navigate('/'));
  };

  return (
    <div className="auth-page">
      {/* Animated background particles */}
      <div className="auth-bg">
        {particles.map((p, i) => <Particle key={i} style={p} />)}
        <div className="auth-bg-gradient" style={{ background: theme.gradient }} />
        <div className="auth-bg-grid" />
        {/* Scanline effect */}
        <div className="auth-scanline" />
      </div>

      {/* Left side: branding */}
      <div className={`auth-left ${step >= 1 ? 'visible' : ''}`}>
        <div className="auth-brand">
          <div className="auth-logo">
            <span className="auth-logo-icon animate-float">⛩</span>
            <span>
              <span className="gradient-text" style={{ fontSize: '48px', fontWeight: '900' }}>MANGA</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '32px' }}>UZ</span>
            </span>
          </div>

          <div className="auth-brand-text">
            <h2 className={`auth-tagline ${step >= 2 ? 'visible' : ''}`}>
              <span className="animate-neonPulse gradient-text">Manga olamiga</span>
              <br />
              xush kelibsiz!
            </h2>
            <p className={`auth-brand-desc ${step >= 3 ? 'visible' : ''}`}>
              Minglab manga, bitta joyda.<br />
              O'qing, baholang, zavqlaning.
            </p>
          </div>

          {/* Stats */}
          <div className={`auth-stats ${step >= 3 ? 'visible' : ''}`}>
            {[
              { num: '10K+', label: 'Foydalanuvchi' },
              { num: '500+', label: 'Manga' },
              { num: '50K+', label: 'Bob' },
            ].map((s, i) => (
              <div key={i} className="auth-stat" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="auth-stat-num gradient-text">{s.num}</div>
                <div className="auth-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <MangaPanels />
        </div>
      </div>

      {/* Right side: form */}
      <div className={`auth-right ${step >= 2 ? 'visible' : ''}`}>
        <div className="auth-form-wrap">
          {/* Tab switcher */}
          <div className="auth-tabs">
            <Link
              to="/login"
              className={`auth-tab ${isLogin ? 'active' : ''}`}
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/register"
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
            >
              {t('nav.register')}
            </Link>
            <div
              className="auth-tab-indicator"
              style={{ left: isLogin ? '0%' : '50%' }}
            />
          </div>

          <div className="auth-form-header">
            <h1 className="auth-title">
              {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
            </h1>
            <p className="auth-subtitle">
              {isLogin ? t('auth.loginSub') : 'Bepul hisob yarating va o\'qishni boshlang'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Username field (register only) */}
            {!isLogin && (
              <div className="form-field animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <label className="form-label">{t('auth.username')}</label>
                <div className="form-input-wrap">
                  <FiUser className="form-icon" />
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="manga_lover"
                    className="form-input"
                    autoComplete="username"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-field animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
              <label className="form-label">{t('auth.email')}</label>
              <div className="form-input-wrap">
                <FiMail className="form-icon" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="form-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="form-label-row">
                <label className="form-label">{t('auth.password')}</label>
                {isLogin && (
                  <a href="#" className="form-forgot">{t('auth.forgotPass')}</a>
                )}
              </div>
              <div className="form-input-wrap">
                <FiLock className="form-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button type="button" className="form-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {/* Password strength (register) */}
              {!isLogin && form.password && (
                <div className="pass-strength">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`pass-bar ${form.password.length >= i * 2 ? 'active' : ''}`}
                      style={{ background: form.password.length >= i * 2 ? theme.primary : '' }} />
                  ))}
                  <span className="pass-label">
                    {form.password.length < 4 ? '😟 Juda zaif' :
                     form.password.length < 6 ? '😐 Zaif' :
                     form.password.length < 10 ? '😊 Yaxshi' : '💪 Kuchli'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password (register only) */}
            {!isLogin && (
              <div className="form-field animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
                <label className="form-label">{t('auth.confirmPass')}</label>
                <div className="form-input-wrap">
                  <FiLock className="form-icon" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    name="confirmPass"
                    value={form.confirmPass}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`form-input ${form.confirmPass && form.confirmPass !== form.password ? 'input-error' : ''}`}
                    autoComplete="new-password"
                  />
                  <button type="button" className="form-eye" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {form.confirmPass && form.confirmPass !== form.password && (
                  <p className="field-error">❌ Parollar mos kelmaydi</p>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="auth-error animate-fadeIn">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={`auth-submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
              style={{ background: theme.gradient }}
            >
              {loading ? (
                <div className="btn-loader">
                  <span className="animate-spin">◌</span>
                  Yuklanmoqda...
                </div>
              ) : (
                <>
                  {isLogin ? t('auth.login') : t('auth.register')}
                  <FiArrowRight className="btn-arrow" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>{t('auth.orContinue')}</span>
            </div>

            {/* Guest button */}
            <button type="button" className="auth-guest-btn" onClick={handleGuest}>
              <FiZap />
              {t('auth.loginGuest')}
            </button>
          </form>

          {/* Switch mode */}
          <p className="auth-switch">
            {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
            <Link to={isLogin ? '/register' : '/login'} className="auth-switch-link">
              {isLogin ? t('auth.register') : t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
