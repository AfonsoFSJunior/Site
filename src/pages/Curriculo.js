import '../styles/Curriculo.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DownloadButton from '../components/DownloadButton.js';
import ResumeEnglish from '../components/files/Curriculum_Vitae_Afonso_Ferreira-English.pdf';
import ResumePortuguese from '../components/files/Curriculum_Vitae_Afonso_Ferreira-Portugues.pdf';
import ResumeItalian from '../components/files/Curriculum_Vitae_Afonso_Ferreira-Italiano.pdf';
import { useReveal, useRevealChildren } from '../hooks/useScrollAnimation';

export const Curriculo = () => {
  const { t } = useTranslation();
  const mainRef = useReveal('up');
  const resumeItemsRef = useRevealChildren('.item-resume', 120, 'up');

  return (
    <div className="curriculo-page">
      <main className="main" ref={mainRef}>
        <h2>{t('curriculo.titulo')}</h2>
        <ul className="files" ref={resumeItemsRef}>
          <li className="item-resume">
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
          <li className="item-resume">
            <h3>{t('curriculo.cv')}</h3>
            <DownloadButton
              downloadUrl={ResumeEnglish}
              downloadFileName="Curriculum_Vitae_Afonso_Ferreira-English"
              buttonStyle="btn--primary"
            >
              {t('curriculo.baixar')}
            </DownloadButton>
            <p>{t('curriculo.idiomaEn')}</p>
          </li>
          <li className="item-resume">
            <h3>{t('curriculo.cv')}</h3>
            <DownloadButton
              downloadUrl={ResumeItalian}
              downloadFileName="Curriculum_Vitae_Afonso_Ferreira-Italiano"
              buttonStyle="btn--primary"
            >
              {t('curriculo.baixar')}
            </DownloadButton>
            <p>{t('curriculo.idiomaIt')}</p>
          </li>
        </ul>
      </main>
    </div>
  );
};
