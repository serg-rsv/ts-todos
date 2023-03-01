import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormTodoAdd from './components/FormTodoAdd';
import Modal from './components/Modal';
import TableHeader from './components/TableHeader';
import TodoDetails from './components/TodoDetails';
import TodoList from './components/TodoList';

import { completeTodo, selectTodos, ITodo } from './redux/todoSlice';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleComplete = (id: number) => {
    dispatch(
      completeTodo({
        id,
        completed: true,
      })
    );
    setCurrentTodo((prev) =>
      prev?.id === id ? { ...prev, completed: true } : prev
    );
  };

  const handleOpenModal = (todo: ITodo) => {
    setCurrentTodo(todo);
  };

  const handleCloseModal = () => {
    setCurrentTodo(null);
  };

  return (
    <div className={styles.container}>
      <FormTodoAdd />
      <TableHeader />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          onCompleteClick={handleComplete}
          onTodoClick={handleOpenModal}
        />
      )}
      <Modal
        isOpen={!!currentTodo}
        content={
          <TodoDetails
            todo={currentTodo as ITodo}
            onCompleteClick={handleComplete}
          />
        }
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
