import styles from './Result.module.css';
import PropTypes from 'prop-types';

const Result = ({ data, deleteItem }) => {
  const { id, name, number } = data;
  return (
    <li className={styles.card}>
      <p className={styles.name}>
        {name} 📞 {number}
      </p>
      <button
        className={styles.deleteBtn}
        data-id={id}
        type="button"
        onClick={deleteItem}
      >
        🗑️
      </button>
    </li>
  );
};

Result.propTypes = {
  data: PropTypes.object,
  deleteItem: PropTypes.func,
};

export default Result;
