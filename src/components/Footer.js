import React from 'react';
import { getYear } from 'date-fns';
import '../styles/Footer.css';
import logoWordmark from './images/Logo Branca.png';
import { useTranslation } from 'react-i18next';

function Footer() {
  const anoAtual = getYear(new Date());
  const { t } = useTranslation();

  return (
    <div className="footer-container">
      <div className="social-medias">
        <a
          href="https://www.linkedin.com/in/afonso-ferreira-da-silva-junior/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin" />
        </a>
      </div>
      <div className="copyright">
        <p className="copyright-line">
          <span>
            {t('footer.texto1')} - {anoAtual} ©
          </span>
          <img src={logoWordmark} alt="Afonso Ferreira" className="footer-wordmark" />
        </p>
      </div>
    </div>
  );
}

export default Footer;
