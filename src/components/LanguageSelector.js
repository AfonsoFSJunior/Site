import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

const LANGUAGES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
];

function LanguageSelector({ variant = 'desktop' }) {
  const { i18n, t } = useTranslation();

  const resolved = (i18n.resolvedLanguage || i18n.language || 'pt').split('-')[0];
  const currentLanguage = ['pt', 'en', 'it'].includes(resolved) ? resolved : 'pt';

  const handleLanguageChange = (code) => {
    if (code !== currentLanguage) {
      i18n.changeLanguage(code);
    }
  };

  return (
    <div
      className={`language-toggle language-toggle--${variant}`}
      role="group"
      aria-label={t('header.idioma', { defaultValue: 'Idioma' })}
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`language-toggle-btn ${currentLanguage === code ? 'active' : ''}`}
          onClick={() => handleLanguageChange(code)}
          aria-pressed={currentLanguage === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
