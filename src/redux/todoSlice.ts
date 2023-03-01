import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  todos: ITodo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    completeTodo: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
  },
});

export const { addTodo, completeTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
