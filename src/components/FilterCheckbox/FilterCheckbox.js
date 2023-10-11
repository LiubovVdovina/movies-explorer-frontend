import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className='checkbox'>
      <label className="filter">
          <input
            className="filter__checkbox"
            type="checkbox"
          />
          <span className="filter__tumbler"></span>
      </label>
      <span className="checkbox__text">Короткометражки</span>
    </div>
  );
}