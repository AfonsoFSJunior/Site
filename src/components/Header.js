import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useTranslation } from 'react-i18next';
import logoBranca from './images/Logo AF Branca.png';

function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage || i18n.language || 'pt').split('-')[0];

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logoBranca} alt='Logo Afonso Ferreira' className='navbar-logo-image' />
            <span className='navbar-logo-text'>{t('header.brand')}</span>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/trabalhos' className='nav-links' onClick={closeMobileMenu}>
                {t('header.trabalhos')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/curriculo' className='nav-links' onClick={closeMobileMenu}>
                {t('header.curriculo')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/contato' className='nav-links' onClick={closeMobileMenu}>
                {t('header.contato')}
              </Link>
            </li>

            {/* Seletor de idioma para mobile */}
            <li className='nav-item language-selector-mobile'>
              <select onChange={handleLanguageChange} value={currentLanguage}>
                <option value='pt'>🇧🇷 PT-</option>
                <option value='en'>🇺🇸 EN</option>
                <option value='it'>🇮🇹 IT</option>
              </select>
            </li>
          </ul>

          {/* Seletor de idioma para desktop */}
          <div className='language-selector desktop-only'>
            <select onChange={handleLanguageChange} value={currentLanguage}>
              <option value='pt'>🇧🇷 PT</option>
              <option value='en'>🇺🇸 EN</option>
              <option value='it'>🇮🇹 IT</option>
            </select>
          </div>
        </div>
        <hr className='nav-hr' />
      </nav>
    </>
  );
}

export default Header;
