import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className='checkbox__container'>
      <label className="filter">
          <input
            className="filter__checkbox"
            type="checkbox"
          />
          <span className="filter__tumbler"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}