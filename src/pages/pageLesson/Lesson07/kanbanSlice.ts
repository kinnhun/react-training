// kanbanSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

export type ColumnType = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  content: string;
  createdAt: string;
}

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
}

interface BoardState {
  columns: Column[];
}

const loadFromLocalStorage = (): Column[] | null => {
  try {
    const saved = localStorage.getItem('kanban-board');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const defaultColumns: Column[] = [
  { id: 'todo', title: 'TO DO', tasks: [] },
  { id: 'inProgress', title: 'IN PROGRESS', tasks: [] },
  { id: 'done', title: 'DONE', tasks: [] },
];

const initialState: BoardState = {
  columns: loadFromLocalStorage() || defaultColumns,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ columnId: ColumnType; content: string }>) {
      const col = state.columns.find(c => c.id === action.payload.columnId);
      if (col) {
        col.tasks.push({
          id: uuidv4(),
          content: action.payload.content,
          createdAt: new Date().toLocaleString(),
        });
      }
    },
    editTask(state, action: PayloadAction<{ columnId: ColumnType; taskId: string; content: string }>) {
      const col = state.columns.find(c => c.id === action.payload.columnId);
      const task = col?.tasks.find(t => t.id === action.payload.taskId);
      if (task) task.content = action.payload.content;
    },
    deleteTask(state, action: PayloadAction<{ columnId: ColumnType; taskId: string }>) {
      const col = state.columns.find(c => c.id === action.payload.columnId);
      if (col) col.tasks = col.tasks.filter(t => t.id !== action.payload.taskId);
    },
    moveTask(state, action: PayloadAction<{ fromColumn: ColumnType; toColumn: ColumnType; taskId: string }>) {
      const fromCol = state.columns.find(c => c.id === action.payload.fromColumn);
      const toCol = state.columns.find(c => c.id === action.payload.toColumn);
      const task = fromCol?.tasks.find(t => t.id === action.payload.taskId);
      if (fromCol && toCol && task) {
        fromCol.tasks = fromCol.tasks.filter(t => t.id !== action.payload.taskId);
        toCol.tasks.push(task);
      }
    },
    moveTaskWithinColumn(state, action: PayloadAction<{ columnId: ColumnType; fromIndex: number; toIndex: number }>) {
      const col = state.columns.find(c => c.id === action.payload.columnId);
      if (col && action.payload.fromIndex !== action.payload.toIndex) {
        const [moved] = col.tasks.splice(action.payload.fromIndex, 1);
        col.tasks.splice(action.payload.toIndex, 0, moved);
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  moveTask,
  moveTaskWithinColumn,
} = boardSlice.actions;

export default boardSlice.reducer;
