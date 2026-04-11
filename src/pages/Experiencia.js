import '../App.css';
import '../styles/Sections.css';
import { useTranslation } from 'react-i18next';

export const Experiencia = () => {
  const { t } = useTranslation();
  const positions = t('experiencia.cargos', { returnObjects: true });
  const initialTrajectory = t('experiencia.trajetoriaInicial', { returnObjects: true });
  const otherSectors = t('experiencia.outrosSetores', { returnObjects: true });

  return (
    <section className='content-page'>
      <h1 className='content-title'>{t('experiencia.titulo')}</h1>
      <p className='content-intro'>{t('experiencia.intro')}</p>

      <div className='content-grid'>
        {positions.map((position) => (
          <article className='content-card' key={`${position.cargo}-${position.periodo}`}>
            <h2>{position.cargo}</h2>
            <p>{position.empresa}</p>
            <p className='muted'>{position.periodo}</p>
          </article>
        ))}
      </div>

      <h2 className='subsection-title'>{t('experiencia.trajetoriaInicialTitulo')}</h2>
      <ul className='content-list'>
        {initialTrajectory.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className='subsection-title'>{t('experiencia.outrosSetoresTitulo')}</h2>
      <ul className='content-list'>
        {otherSectors.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
