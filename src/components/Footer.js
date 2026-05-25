import React from 'react';
import { getYear } from 'date-fns';
import '../styles/Footer.css'
import { useTranslation } from 'react-i18next';


function Footer() {
  const anoAtual = getYear(new Date());
  const { t } = useTranslation();
  
  return (
    <>
      <div className='footer-container'>
        <div className='social-medias'>
          <a href='https://www.linkedin.com/in/afonso-ferreira-da-silva-junior/' target="_blank" rel="noopener noreferrer" aria-label='LinkedIn'>
            <i className="fab fa-linkedin"/>
          </a>
        </div>
        <div className='copyright'>
          {t('footer.texto1')} - {anoAtual} {t('footer.texto2')} ©
        </div>
      </div>
    </>
  );
}

export default Footer;