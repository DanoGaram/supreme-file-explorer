import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FileExplorerState {
  currentPath: string;
}

const initialState: FileExplorerState = {
  currentPath: '/'
};

export const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    changePath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    }
  }
});

export default fileExplorerSlice.reducer;
