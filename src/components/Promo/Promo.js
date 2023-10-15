import './Promo.css';
import logo from '../../images/promo-logo.svg';

export default function Promo() {
    return (
      <section  className='section promo'>
        <div className='section__container promo__container'>
          <div className='promo__about'>
            <h1 className='promo__title'>
              Учебный проект студента факультета Веб&#8209;разработки.
            </h1>
            <p className='promo__text'>
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <a className='promo__link button' 
              target='_blank'
              rel="noreferrer"
              href='https://practicum.yandex.ru/web/'>
                Узнать больше
            </a>
          </div>
          <img className='promo__logo' src={logo} alt="Земной шар, составленный из множества слов WEB"/>
        </div>
      </section>
    )
}