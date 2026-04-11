import '../App.css';
import '../styles/Sections.css';
import { useTranslation } from 'react-i18next';

export const Cursos = () => {
  const { t } = useTranslation();
  const courses = t('cursos.categorias', { returnObjects: true });
  const idiomas = t('cursos.idiomasLista', { returnObjects: true });
  const afiliacoes = t('cursos.afiliacoesLista', { returnObjects: true });

  return (
    <section className='content-page'>
      <h1 className='content-title'>{t('cursos.titulo')}</h1>
      <p className='content-intro'>{t('cursos.intro')}</p>

      {courses.map((category) => (
        <div className='content-block' key={category.titulo}>
          <h2 className='subsection-title'>{category.titulo}</h2>
          <ul className='content-list'>
            {category.itens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className='content-block'>
        <h2 className='subsection-title'>{t('cursos.idiomasTitulo')}</h2>
        <ul className='content-list'>
          {idiomas.map((idioma) => (
            <li key={idioma}>{idioma}</li>
          ))}
        </ul>
      </div>

      <div className='content-block'>
        <h2 className='subsection-title'>{t('cursos.afiliacoesTitulo')}</h2>
        <ul className='content-list'>
          {afiliacoes.map((afiliacao) => (
            <li key={afiliacao}>{afiliacao}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
