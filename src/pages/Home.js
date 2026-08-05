import '../styles/Home.css';
import React from 'react';
import Button from '../components/Button.js';
import { useTranslation } from 'react-i18next';
import profileImage from '../components/images/Afonso-Ferreira.jpg';
import { useReveal, useRevealChildren } from '../hooks/useScrollAnimation';

export const Home = () => {
  const { t } = useTranslation();
  const expertise = t('home.especialidadesLista', { returnObjects: true });

  const heroRef = useReveal('up', 0);
  const aboutRef = useReveal('up', 60);
  const skillsRef = useRevealChildren('.skill-chip', 40, 'up');
  const closeRef = useReveal('up', 80);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-shell home-hero-grid" ref={heroRef}>
          <div className="home-card home-hero-copy">
            <h1 className="home-brand">{t('home.marca')}</h1>
            <p className="home-headline">{t('home.headline')}</p>
            <p className="home-lead">{t('home.lead')}</p>
            <div className="home-hero-cta">
              <Button path="/trabalhos" buttonStyle="btn--outline" buttonSize="btn--large">
                {t('home.btnTrabalhos')}
              </Button>
            </div>
          </div>
          <div className="home-hero-media">
            <img src={profileImage} alt={t('home.nome')} className="home-hero-photo" />
          </div>
        </div>
      </section>

      <section className="home-content">
        <div className="home-shell home-content-grid">
          <article className="home-card" ref={aboutRef}>
            <p className="home-section-label">{t('home.sobreLabel')}</p>
            <h2 className="home-section-title">{t('home.descricao')}</h2>
            <p className="home-section-text">{t('home.resumo2')}</p>
          </article>

          <article className="home-card" ref={skillsRef}>
            <p className="home-section-label">{t('home.especialidades')}</p>
            <ul className="skill-chips">
              {expertise.map((item) => (
                <li className="skill-chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="home-card home-card--close" ref={closeRef}>
            <div className="home-close-copy">
              <p className="home-section-label">{t('home.destaquesTitulo')}</p>
              <p className="home-section-text">{t('home.interesses')}</p>
              <p className="home-section-text home-section-text--soft">{t('home.interesses2')}</p>
              <div className="home-close-cta">
                <Button path="/trabalhos" buttonStyle="btn--primary" buttonSize="btn--large">
                  {t('home.btnTrabalhos')}
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
