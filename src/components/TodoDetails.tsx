import { ITodo } from '../redux/todoSlice';
import styles from '../styles/TodoDetails.module.css';

interface Props {
  todo: ITodo;
  onCompleteClick: (id: number) => void;
}

const TodoDetails: React.FC<Props> = ({ todo, onCompleteClick }) => {
  return (
    <>
      <h2 className={styles.title}>{todo.title}</h2>
      <h4>Description:</h4>
      <p>{todo.description}</p>
      <label className={styles.status}>
        Status:
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onCompleteClick(todo.id)}
        />
      </label>
    </>
  );
};
export default TodoDetails;
