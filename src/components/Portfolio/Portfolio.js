import './Portfolio.css';
import icon from '../../images/portfolio__item-icon.svg';

export default function Portfolio() {
    return (
      <section  className='section portfolio'>
        <div className='section__container portfolio__container'>
          <h2 className='portfolio__subtitle'>Портфолио</h2>
          <ul className='portfolio__list'>
            <li className='portfolio__item'>
              <a className='link portfolio__link'
                href="https://github.com/LiubovVdovina/how-to-learn"
                target='_blank'
                rel="noreferrer">
                  Статичный сайт
                  <img className='link portfolio__item-icon' src={icon} alt='стрелочка' />
              </a>
            </li>
            <li className='portfolio__item'>
              <a className='link portfolio__link'
                href="https://liubovvdovina.github.io/russian-travel/"
                target='_blank'
                rel="noreferrer">
                  Адаптивный сайт
                  <img className='link portfolio__item-icon' src={icon} alt='стрелочка' />
              </a>
            </li>
            <li className='portfolio__item'>
              <a className='portfolio__link link'
                href="https://github.com/LiubovVdovina/react-mesto-api-full-gha"
                target='_blank'
                rel="noreferrer">
                  Одностраничное приложение
                  <img className='link portfolio__item-icon' src={icon} alt='стрелочка' />
              </a>
            </li>
          </ul>
        </div>
      </section>
    )
}