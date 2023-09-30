import React, { useState, useEffect, useRef } from 'react';
import styles from './Form.module.css';
import Result from 'components/Result/Result';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from 'components/LocalStorage/LocalStorage';

const LOCAL_STORAGE_KEY = 'data';

const Form = () => {
  const firstRender = useRef(true);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchedLocalStorage = getDataFromLocalStorage(LOCAL_STORAGE_KEY);
    if (fetchedLocalStorage) {
      setData(fetchedLocalStorage);
    }
  }, []);

  useEffect(() => {
    const isFirstRender = firstRender.current;

    if (isFirstRender) {
      firstRender.current = false;
      return;
    }
    if (filterValue) {
      const filteredItems = data.filter(person =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFiltered(filteredItems.length ? filteredItems : 'Not found');
    } else if (data.length > 0) {
      setFiltered(data);
    } else {
      setFiltered([]);
    }
    setDataToLocalStorage(LOCAL_STORAGE_KEY, data); // Сохраняем данные в localStorage
  }, [data, filterValue]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const contact = {
      name: evt.target.elements.name.value,
      number: evt.target.elements.number.value,
      id: nanoid(),
    };

    setData(prevData => {
      const reservedName = prevData.some(user => user.name === contact.name);

      if (reservedName) {
        Notiflix.Notify.failure('You should take another name');
        return prevData;
      } else {
        const newData = [...prevData, contact];
        setDataToLocalStorage(LOCAL_STORAGE_KEY, newData);
        return newData;
      }
    });

    evt.target.elements.name.value = '';
    evt.target.elements.number.value = '';
  };

  const deleteItem = evt => {
    const idToDelete = evt.target.getAttribute('data-id');
    const newData = data.filter(contact => contact.id !== idToDelete);
    setData(newData);
  };

  const handleFilterChange = evt => {
    setFilterValue(evt.target.value);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Phonebook</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={styles.submitBtn} type="submit">
          Add contact
        </button>
      </form>
      <Filter filterItem={handleFilterChange} />
      <ul className={styles.gallery}>
        {filtered === 'Not found'
          ? null
          : filtered.map(contact => (
              <Result data={contact} key={contact.id} deleteItem={deleteItem} />
            ))}
      </ul>
    </>
  );
};

export default Form;
