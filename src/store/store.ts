// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import boardReducer from '../pages/pageLesson/Lesson07/kanbanSlice'; // ✅ Thêm dòng này

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer, // ✅ Đăng ký thêm slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
