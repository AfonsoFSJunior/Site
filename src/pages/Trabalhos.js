import '../App.css';
import '../styles/Trabalhos.css';
import { useTranslation } from 'react-i18next';

export const Trabalhos = () => {
  const { t } = useTranslation();
  const positions = t('experiencia.cargos', { returnObjects: true });
  const courses = t('cursos.categorias', { returnObjects: true });
  const affiliations = t('cursos.afiliacoesLista', { returnObjects: true });
  const languages = t('cursos.idiomasLista', { returnObjects: true });

  return (
    <section className='works'>
      <h1 className='main-title'>{t('experiencia.titulo')}</h1>
      <hr className='divider' />

      <div className='work'>
        <div className='info-container-1'>
          <h2 className='work-title'>{t('experiencia.intro')}</h2>
          <ul className='vertical'>
            {positions.map((position) => (
              <li key={`${position.cargo}-${position.periodo}`}>
                <b>{position.cargo}</b><br />
                {position.empresa}<br />
                <span className='muted'>{position.periodo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className='divider' />
      <div className='work'>
        <div className='info-container-2'>
          <h2 className='work-title'>{t('cursos.afiliacoesTitulo')}</h2>
          <ul className='vertical'>
            {affiliations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr className='divider' />
      <div className='work'>
        <div className='info-container-1'>
          <h2 className='work-title'>{t('cursos.titulo')}</h2>
          <ul className='vertical'>
            {courses.map((category) => (
              <li key={category.titulo}>
                <b>{category.titulo}</b>
                <ul className='vertical nested-list'>
                  {category.itens.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className='divider' />
      <div className='work'>
        <div className='info-container-2'>
          <h2 className='work-title'>{t('cursos.idiomasTitulo')}</h2>
          <ul className='vertical'>
            {languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
