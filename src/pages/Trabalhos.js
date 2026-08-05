import '../styles/Trabalhos.css';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/useScrollAnimation';

const WORKS_REVEAL = { threshold: 0.06, rootMargin: '0px 0px -24px 0px' };

export const Trabalhos = () => {
  const { t } = useTranslation();
  const positions = t('experiencia.cargos', { returnObjects: true });
  const courses = t('cursos.categorias', { returnObjects: true });
  const affiliations = t('cursos.afiliacoesLista', { returnObjects: true });
  const languages = t('cursos.idiomasLista', { returnObjects: true });
  const formation = t('formacao.academica', { returnObjects: true });

  const titleRef = useReveal('up', 0, WORKS_REVEAL);
  const expRef = useReveal('left', 0, WORKS_REVEAL);
  const formRef = useReveal('right', 40, WORKS_REVEAL);
  const affRef = useReveal('left', 0, WORKS_REVEAL);
  const coursesRef = useReveal('right', 40, WORKS_REVEAL);
  const langRef = useReveal('left', 0, WORKS_REVEAL);

  return (
    <section className="works">
      <h1 className="main-title" ref={titleRef}>
        {t('header.trabalhos')}
      </h1>
      <hr className="divider" />

      <div className="work">
        <div className="info-container-1" ref={expRef}>
          <h2 className="work-title">{t('experiencia.titulo')}</h2>
          <p>{t('experiencia.intro')}</p>
          <ul className="vertical">
            {positions.map((position) => (
              <li key={`${position.cargo}-${position.periodo}`}>
                <b>{position.cargo}</b>
                {position.empresa}
                <br />
                <span className="muted">{position.periodo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="work">
        <div className="info-container-2" ref={formRef}>
          <h2 className="work-title">{t('formacao.titulo')}</h2>
          <p>{t('formacao.intro')}</p>
          <ul className="vertical">
            {formation.map((item) => (
              <li key={item.curso}>
                <b>{item.curso}</b>
                {item.instituicao}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="work">
        <div className="info-container-1" ref={affRef}>
          <h2 className="work-title">{t('cursos.afiliacoesTitulo')}</h2>
          <ul className="vertical">
            {affiliations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="work">
        <div className="info-container-2" ref={coursesRef}>
          <h2 className="work-title">{t('cursos.titulo')}</h2>
          <ul className="vertical">
            {courses.map((category) => (
              <li key={category.titulo}>
                <b>{category.titulo}</b>
                <ul className="vertical nested-list">
                  {category.itens.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="work">
        <div className="info-container-1" ref={langRef}>
          <h2 className="work-title">{t('cursos.idiomasTitulo')}</h2>
          <ul className="vertical">
            {languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
