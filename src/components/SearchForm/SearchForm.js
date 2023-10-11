import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <section className="section search">
      <div className="search__container section__container">
        <form className="search__form" name="search-form" noValidate>
          <input
            className="search__input"
            name="search-input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="button search__button" type="submit"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  )
}