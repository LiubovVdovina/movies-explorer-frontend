import './AboutMe.css';
import photo from '../../images/photo.jpg';

export default function AboutMe() {
    return (
      <section  className='section about-me'>
        <div className='section__container about-me__container'>
        <h2 className='section__title'>Студент</h2>
          <div className='about-me__info'>
            <div className='about-me__text'>
              <div>
                <h3 className='about-me__subtitle'>Любовь</h3>
                <p className='about-me__job'>Фронтенд-разработчик, 28 лет</p>
                <p className='about-me__description'>Проживаю в Красноярске. 
                Закончила бакалавриат ИКИТ СФУ по специальности "Информационная безопасность" 
                и магистратуру ИФиЯК СФУ "Перевод и межкультурная коммуникация".
                Всегда любила программирование за возможность размять мозг
                и получить удовольствие от достижения результата. 
                Мои хобби – туризм, рисование и изучение других языков.</p>
              </div>
              <a className='link about-me__link'
                href='https://github.com/LiubovVdovina'
                target='_blank'
                rel="noreferrer">Github
              </a>
            </div>
            <img className='about-me__photo' src={photo} alt='фотография девушки'/>
          </div>
        </div>
      </section>
    )
}