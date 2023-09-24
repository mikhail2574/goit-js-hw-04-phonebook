import PropTypes from 'prop-types';

const LocalStorage = ({ dataType, value }) => {
  // Functions for LocalStorage
  const setItem = (dataType, value) => localStorage.setItem(dataType, value);
  const getItem = dataType => localStorage.getItem(dataType);
};

LocalStorage.propTypes = {
  data: PropTypes.array,
  key: PropTypes.string,
  deleteItem: PropTypes.object,
};

export default LocalStorage;
