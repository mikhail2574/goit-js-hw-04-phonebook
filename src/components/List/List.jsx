import Result from 'components/Result/Result';
import styles from '../Form/Form.module.css';

const List = ({ data, deleteItem }) => {
  return (
    <ul className={styles.gallery}>
      {data.map(contact => (
        <Result data={contact} key={contact.id} deleteItem={deleteItem} />
      ))}
    </ul>
  );
};

export default List;
