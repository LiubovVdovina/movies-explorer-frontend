import './NotFound.css';
import { useNavigate } from "react-router-dom";

export default function NotFound() {

  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  return (
    <section className="section not-found">
      <div className="not-found__info">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button onClick={goBack} className="link not-found__link">
        Назад
      </button>
    </section>
  );
}