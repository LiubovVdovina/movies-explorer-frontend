import './MoviesCard.css';
import { useLocation } from 'react-router-dom';


export default function MoviesCard({ card }) {
  const location = useLocation();
  return (
    <div className="card">
      <img className="card__image" src={card.image} alt={card.name} />
      <div className="card__info">
        <div className='card__caption'>
          <p className='card__title'>{card.name}</p>
          {card.isSaved ? (
            <button className={`button card__button 
              ${location.pathname === '/saved-movies' ? 'card__button_type_remove' : 'card__button_type_saved'}`}></button>
          ) :
          (
            <button className='button card__button card__button_type_not-saved'></button>
          )}
        </div>
        <span className="card__duration">{card.duration}</span>
      </div>
    </div>
  )
}