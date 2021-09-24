import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fileExplorerReducer from './fileExplorerSlice';

export const store = configureStore({
  reducer: {
    fileExplorer: fileExplorerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
