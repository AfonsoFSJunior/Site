import '../App.css';
import '../styles/Sections.css';
import { useTranslation } from 'react-i18next';

export const Formacao = () => {
  const { t } = useTranslation();
  const academic = t('formacao.academica', { returnObjects: true });
  const extras = t('formacao.complementar', { returnObjects: true });

  return (
    <section className='content-page'>
      <h1 className='content-title'>{t('formacao.titulo')}</h1>
      <p className='content-intro'>{t('formacao.intro')}</p>

      <h2 className='subsection-title'>{t('formacao.academicaTitulo')}</h2>
      <div className='content-grid'>
        {academic.map((item) => (
          <article className='content-card' key={`${item.curso}-${item.instituicao}`}>
            <h3>{item.curso}</h3>
            <p>{item.instituicao}</p>
          </article>
        ))}
      </div>

      <h2 className='subsection-title'>{t('formacao.complementarTitulo')}</h2>
      <ul className='content-list'>
        {extras.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
