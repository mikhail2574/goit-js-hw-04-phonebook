import React, { useState } from 'react';
import styles from './Form.module.css';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import List from 'components/List/List';

const Form = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    const contact = {
      name: evt.target.elements.name.value,
      number: evt.target.elements.number.value,
      id: nanoid(),
    };
    let reservedName = false;
    data.find(user => {
      if (user.name === contact.name) {
        reservedName = true;
      }

      return null;
    });

    if (reservedName === true) {
      Notiflix.Notify.failure('You should take another name');
      return;
    } else {
      Notiflix.Notify.success(`User ${contact.name} added!`);
      setData(prevState => [...prevState, contact]);
      evt.target.elements.name.value = '';
      evt.target.elements.number.value = '';
    }
  }

  function deleteItem(evt) {
    const idToDelete = evt.target.getAttribute('data-id');
    setData(prevState =>
      prevState.filter(contact => contact.id !== idToDelete)
    );
  }

  function onInputChange(value) {
    setName(value);
  }

  function filterItem() {
    if (!data) return [];
    return data.filter(person =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Phonebook</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={styles.submitBtn} type="submit">
          Add contact
        </button>
      </form>
      <Filter onInputChange={onInputChange} />
      {name !== '' ? (
        <List data={filterItem()} deleteItem={deleteItem} />
      ) : (
        <List data={data} deleteItem={deleteItem} />
      )}
    </>
  );
};

export default Form;
