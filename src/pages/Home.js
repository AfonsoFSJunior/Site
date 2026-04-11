import '../App.css';
import '../styles/Home.css';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button.js';
import { useTranslation } from 'react-i18next';
import profileImage from '../components/images/Afonso-Ferreira.png';
import logoImage from '../components/images/Logo Branca.png';

export const Home = () => {
    const [showLogo, setShowLogo] = useState(false);
    const { t } = useTranslation();
    const expertise = t('home.especialidadesLista', { returnObjects: true });
    const highlights = t('home.destaquesLista', { returnObjects: true });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(true);
        }, 250);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className='main-box'>
                <img src={logoImage} alt='Logo Afonso Ferreira' className={`logo-main-box ${showLogo ? 'show' : ''}`} />
            </div>
            <h1>{t('home.sobre')}</h1>
            <section className='about-container'>
                <div className='side-text'>
                    <p><b>{t('home.nome')}</b><br />{t('home.cargo')}</p>
                    <p>{t('home.resumo')}</p>
                    <p>{t('home.resumo2')}</p>

                    <b>{t('home.especialidades')}</b>
                    <ul className='has-bar'>
                        {expertise.map((item) => (
                            <li className='item' key={item}>{item}</li>
                        ))}
                    </ul>

                    <b>{t('home.destaques')}</b>
                    <ul className='tecnologies'>
                        {highlights.map((item) => (
                            <li className='item' key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className='professional-image-box'>
                    <img src={profileImage} alt={t('home.nome')} className='professional-image' />
                </div>
            </section>
            <div className='btn-contato'>
                <Button path='/trabalhos' buttonSize={'btn--medium'}>
                    {t('home.btnTrabalhos')}
                </Button>
            </div>
        </>
    );
};
