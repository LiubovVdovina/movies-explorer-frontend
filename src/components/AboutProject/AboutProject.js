import { Link } from 'react-router-dom';
import './AboutProject.css';

export default function AboutProject() {
    return (
      <section  className='section about'>
        <div className='about__container section__container'>
          <h2 className='section__title'>О проекте</h2>
          <ul className='about__texts'>
            <li className='about__text'>
              <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
              <p className='about__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className='about__text'>
              <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
              <p className='about__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
          </ul>
          <div className='timeline'>
            <p className='timeline__cell timeline__top timeline__one-week'>1 неделя</p>
            <p className='timeline__cell timeline__top timeline__four-weeks'>4 недели</p>
            <p className='timeline__cell timeline__bottom timeline__backend'>Back-end</p>
            <p className='timeline__cell timeline__bottom timeline__frontend'>Front-end</p>
          </div>
        </div>
      </section>
    )
}