export const getDataFromLocalStorage = key => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setDataToLocalStorage = (key, data, callback) => {
  localStorage.setItem(key, JSON.stringify(data));
  if (typeof callback === 'function') {
    callback();
  }
};
