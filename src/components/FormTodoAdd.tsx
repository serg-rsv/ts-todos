import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTodo, selectTodos, ITodo } from '../redux/todoSlice';
import styles from '../styles/FormTodoAdd.module.css';

const FormTodoAdd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'title': {
        setTitle(value);
        setIsTitleValid(value.trim() !== '');
        break;
      }
      case 'description': {
        setDescription(value);
        setIsDescriptionValid(value.trim() !== '');
        break;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoTitle = title.trim();
    const todoDescription = description.trim();
    if (!todoTitle || !todoDescription) {
      setIsTitleValid(todoTitle !== '');
      setIsDescriptionValid(todoDescription !== '');
      return;
    }
    const todo: ITodo = {
      id: 1 + todos.length,
      title: todoTitle,
      description: todoDescription,
      completed: false,
    };
    dispatch(addTodo(todo));
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          className={styles.input}
          id="title"
          type="text"
          value={title}
          onChange={handleChange}
          name="title"
          placeholder="Enter title"
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: isTitleValid ? 'initial' : 'red',
          }}
        />
        {!isTitleValid && (
          <div style={{ position: 'absolute', color: 'red', fontSize: '12px' }}>
            This filed is empty
          </div>
        )}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          className={styles.input}
          id="description"
          type="text"
          value={description}
          onChange={handleChange}
          name="description"
          placeholder="Enter description"
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: isDescriptionValid ? 'initial' : 'red',
          }}
        />
        {!isDescriptionValid && (
          <div style={{ position: 'absolute', color: 'red', fontSize: '12px' }}>
            This filed is empty
          </div>
        )}
      </div>
      <button className={styles.button} type="submit">
        Create
      </button>
    </form>
  );
};

export default FormTodoAdd;
