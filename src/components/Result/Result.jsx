import styles from './Result.module.css';
import PropTypes from 'prop-types';

const Result = ({ data, deleteItem, key }) => {
  if (!data) {
    return;
  }
  const { id, name, number } = data;
  return (
    <li className={styles.card} key={key}>
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
  key: PropTypes.string,
  deleteItem: PropTypes.func,
};

export default Result;
