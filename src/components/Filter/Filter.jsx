import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onInputChange }) => {
  const searchFocus = () => {
    document.querySelector('form').style.display = 'none';
  };
  const searchOffFocus = () => {
    document.querySelector('form').style.display = 'flex';
  };
  return (
    <>
      <div className={styles.search}>
        <h2>Find your contact</h2>
        <input
          className={styles.inputSearch}
          type="text"
          name="search"
          onInput={evt => onInputChange(evt.target.value)}
          onFocus={searchFocus}
          onBlur={searchOffFocus}
        />
      </div>
    </>
  );
};

Filter.propTypes = {
  filterItem: PropTypes.func,
};

export default Filter;
