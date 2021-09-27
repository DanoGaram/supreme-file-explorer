import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createDirectory } from "../../utils";
import { fileSeparator, FileT } from "./types";

export interface FileExplorerState {
  currentPath: string;
  files: FileT[];
}

const initialState: FileExplorerState = {
  currentPath: "/",
  files: [
    { path: "/develop/rols", isFolder: true },
    {
      path: "/develop/rols/Nani",
      src: "https://ramenparados.com/wp-content/uploads/2020/09/tower-of-god.jpg",
    },
    {
      path: "/develop/rols/Deska",
      src: "https://ramenparados.com/wp-content/uploads/2020/09/tower-of-god.jpg",
    },
    { path: "/main", isFolder: true },
    {
      path: "/main/Nani",
      src: "https://ramenparados.com/wp-content/uploads/2020/09/tower-of-god.jpg",
    },
    {
      path: "/main/Deska",
      src: "https://ramenparados.com/wp-content/uploads/2020/09/tower-of-god.jpg",
    },
    { path: "/develop", isFolder: true },
    {
      path: "/develop/Tower of god",
      src: "https://ramenparados.com/wp-content/uploads/2020/09/tower-of-god.jpg",
    },
    {
      path: "/develop/Solo Leveling",
      src: "https://img.anime2you.de/2020/08/solo-lveling.jpg",
    },
    {
      path: "/develop/Naruto",
      src: "https://www.enter.co/wp-content/uploads/2014/11/naruto-dest1-768x432.jpg",
    },
    {
      path: "/develop/One Piece",
      src: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2021/07/one-piece-2403409.jpg?itok=mxFPXuee",
    },
  ],
};

export const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    onChangePath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
  },
});

export const { onChangePath } = fileExplorerSlice.actions;

export const selectFiles = createSelector(
  (state: RootState): FileExplorerState => state.fileExplorer,
  (fileExplorer) => fileExplorer.files
);

export const selectDirectory = createSelector(selectFiles, (files) =>
  createDirectory(
    files.map((x) => ({ path: x.path, isFolder: x.isFolder })),
    fileSeparator
  )
);

export const selectCurrentPath = createSelector(
  (state: RootState): FileExplorerState => state.fileExplorer,
  (fileExplorer) => fileExplorer.currentPath
);

export const selectCurrentFiles = createSelector(
  selectFiles,
  selectCurrentPath,
  (files, currentPath) =>
    files.filter(
      (x) =>
        !x.isFolder &&
        x.path.startsWith(currentPath) &&
        !x.path.replace(currentPath, "").includes(fileSeparator, 1)
    )
);

export const selectCurrentFolders = createSelector(
  selectFiles,
  selectCurrentPath,
  (files, currentPath) =>
    files.filter(
      (x) =>
        x.isFolder &&
        x.path !== currentPath &&
        x.path.startsWith(currentPath) &&
        !x.path.replace(currentPath, "").includes(fileSeparator, 1)
    )
);

export default fileExplorerSlice.reducer;
