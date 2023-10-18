import './FilterCheckbox.css';
import PropTypes from 'prop-types';

export default function FilterCheckbox({ onChange, values }) {
  return (
    <div className='checkbox'>
      <label className="filter">
          <input
            className="filter__checkbox"
            type="checkbox"
            id="checkbox"
            name="shorts"
            checked={values.shorts ?? false}
            onChange={onChange}
          />
          <span className="filter__tumbler"></span>
      </label>
      <span className="checkbox__text">Короткометражки</span>
    </div>
  );
}


FilterCheckbox.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};