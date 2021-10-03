import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createDirectory, filterPath, getNameFromPath } from "../../utils";
import { fileSeparator, FileT, rootPath } from "./types";

export interface FileExplorerState {
  currentPath: string;
  currentPathIndex: number;
  historyPath: string[];
  files: FileT[];
  searchTerm: string;
}

const initialState: FileExplorerState = {
  currentPath: rootPath,
  historyPath: [rootPath],
  currentPathIndex: 0,
  searchTerm: "",
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
      if (state.currentPathIndex !== state.historyPath.length - 1) {
        state.historyPath = state.historyPath.slice(
          0,
          state.currentPathIndex + 1
        );
      }
      state.historyPath.push(action.payload);
      state.currentPath = action.payload;
      state.currentPathIndex = state.historyPath.length - 1;
      state.searchTerm = "";
    },
    onPrevPath: (state) => {
      state.currentPathIndex = state.currentPathIndex - 1;
      state.currentPath = state.historyPath[state.currentPathIndex];
    },
    onNextPath: (state) => {
      state.currentPathIndex = state.currentPathIndex + 1;
      state.currentPath = state.historyPath[state.currentPathIndex];
    },
    onCreateFolder: (state, action: PayloadAction<string>) => {
      state.files.push({
        isFolder: true,
        path: `${state.currentPath}${
          state.currentPath === rootPath ? "" : rootPath
        }${action.payload}`,
      });
    },
    onChangeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    moveContent: (
      state,
      action: PayloadAction<{
        path: string;
        newPath: string;
        isFolder?: boolean;
      }>
    ) => {
      const pathName = getNameFromPath(action.payload.path);
      const newBasePath =
        action.payload.newPath === rootPath
          ? rootPath
          : action.payload.newPath + fileSeparator;
      if (!action.payload.isFolder) {
        const file = state.files.find(
          (x) => x.path === action.payload.path
        ) ?? { path: "" };
        file.path = `${newBasePath}${pathName}`;
      } else {
        state.files.forEach((x) => {
          if (x.path.startsWith(action.payload.path)) {
            x.path = `${newBasePath}${pathName}${x.path.replace(
              action.payload.path,
              ""
            )}`;
          }
        });
      }
    },
    onCreateFiles: (state, action: PayloadAction<FileT[]>) => {
      state.files.push(
        ...action.payload.map((x) => ({
          ...x,
          path: `${state.currentPath}${fileSeparator}${x.path}`,
        }))
      );
    },
  },
});

export const {
  onChangePath,
  onChangeSearchTerm,
  onCreateFolder,
  onPrevPath,
  onNextPath,
  moveContent,
  onCreateFiles,
} = fileExplorerSlice.actions;

export const selectFiles = createSelector(
  (state: RootState): FileExplorerState => state.fileExplorer,
  (fileExplorer) => fileExplorer.files
);

export const selectDirectory = createSelector(selectFiles, (files) =>
  createDirectory(
    files.map((x) => ({ path: x.path, isFolder: x.isFolder })),
    ""
  )
);

export const selectCurrentPath = createSelector(
  (state: RootState): FileExplorerState => state.fileExplorer,
  (fileExplorer) => fileExplorer.currentPath
);

export const selectHistoryPath = (state: RootState) =>
  state.fileExplorer.historyPath;
export const selectCurrentPathIndex = (state: RootState) =>
  state.fileExplorer.currentPathIndex;

export const selectNavigationPathAvailability = createSelector(
  selectHistoryPath,
  selectCurrentPathIndex,
  (history, currentIndex) => ({
    allowPrev: currentIndex > 0,
    allowNext: currentIndex < history.length - 1,
  })
);

export const selectSearchTerm = createSelector(
  (state: RootState): FileExplorerState => state.fileExplorer,
  (fileExplorer) => fileExplorer.searchTerm
);

export const selectCurrentFiles = createSelector(
  selectFiles,
  selectCurrentPath,
  selectSearchTerm,
  (files, currentPath, searchTerm) =>
    files.filter((x) => filterPath(x, currentPath, searchTerm, false))
);

export const selectCurrentFolders = createSelector(
  selectFiles,
  selectCurrentPath,
  selectSearchTerm,
  (files, currentPath, searchTerm) =>
    files.filter((x) => filterPath(x, currentPath, searchTerm, true))
);

export default fileExplorerSlice.reducer;
