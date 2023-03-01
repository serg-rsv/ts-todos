import { ITodo } from '../redux/todoSlice';
import { stringTrim } from '../utils/stringTrim';
import styles from '../styles/TodoList.module.css';

interface Props {
  todos: ITodo[];
  onCompleteClick: (id: number) => void;
  onTodoClick: (todo: ITodo) => void;
}

const TodoList: React.FC<Props> = ({ todos, onCompleteClick, onTodoClick }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li className={styles.row} key={todo.id}>
          <div
            className={styles.children}
            onClick={() => {
              onTodoClick(todo);
            }}
          >
            <p>{todo.id}</p>
            <p>{stringTrim(todo.title, 8)}</p>
            <p>{stringTrim(todo.description, 15)}</p>
          </div>
          <input
            className={styles.box}
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
              e.stopPropagation();
              onCompleteClick(todo.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
