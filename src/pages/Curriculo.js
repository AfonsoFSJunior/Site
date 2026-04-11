import '../App.css';
import '../styles/Curriculo.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DownloadButton from '../components/DownloadButton.js';
import ResumeEnglish from '../components/files/Curriculum_Vitae_Afonso_Ferreira-English.pdf';
import ResumePortuguese from '../components/files/Curriculum_Vitae_Afonso_Ferreira-Portugues.pdf';
import ResumeItalian from '../components/files/Curriculum_Vitae_Afonso_Ferreira-Italiano.pdf';
import Logo from '../components/images/Logo Branca.png';

export const Curriculo = () => {
  const [showLogo, setShowLogo] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='main-box'>
        <img src={Logo} alt='Logo' className={`logo-main-box ${showLogo ? 'show' : ''}`} />
      </div>
      <main className='main'>
        <h2>{t('curriculo.titulo')}</h2>
        <ul className='files'>
          <li className='item-resume'>
            <h3>{t('curriculo.cv')}</h3>
            <DownloadButton
              buttonStyle="btn--primary"
              downloadUrl={ResumePortuguese}
              downloadFileName="Curriculum_Vitae_Afonso_Ferreira-Portugues"
            >
              {t('curriculo.baixar')}
            </DownloadButton>
            <p>{t('curriculo.idiomaPt')}</p>
          </li>
          <li className='item-resume'>
            <h3>{t('curriculo.cv')}</h3>
            <DownloadButton
              downloadUrl={ResumeEnglish}
              downloadFileName="Curriculum_Vitae_Afonso_Ferreira-English"
            >
              {t('curriculo.baixar')}
            </DownloadButton>
            <p>{t('curriculo.idiomaEn')}</p>
          </li>
          <li className='item-resume'>
            <h3>{t('curriculo.cv')}</h3>
            <DownloadButton
              downloadUrl={ResumeItalian}
              downloadFileName="Curriculum_Vitae_Afonso_Ferreira-Italiano"
            >
              {t('curriculo.baixar')}
            </DownloadButton>
            <p>{t('curriculo.idiomaIt')}</p>
          </li>
        </ul>
      </main>
    </>
  );
};