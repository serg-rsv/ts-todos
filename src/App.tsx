import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormTodoAdd from './components/FormTodoAdd';
import { List, TableList } from './components/TableList';
import Modal from './components/Modal';
import TableHeader from './components/TableHeader';
import Tabs, { ITab } from './components/Tabs';
import TodoDetails from './components/TodoDetails';
import TodoList from './components/TodoList';

import { completeTodo, selectTodos, ITodo } from './redux/todoSlice';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
  const [todosV1, setTodosV1] = useState<List[]>([]);
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleOpenModal = (todo: ITodo) => {
    setCurrentTodo(todo);
  };

  const handleCloseModal = () => {
    setCurrentTodo(null);
  };

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

  const tabs: ITab[] = [
    {
      title: 'Todos v1',
      content: <TableList list={todosV1} setList={setTodosV1} />,
    },
    {
      title: 'Todos v2',
      content: (
        <>
          <FormTodoAdd />
          <TableHeader />
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onCompleteClick={handleComplete}
              onTodoClick={handleOpenModal}
            />
          ) : (
            <p
              style={{
                width: '550px',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}
            >
              No todos yet
            </p>
          )}
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} />
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
