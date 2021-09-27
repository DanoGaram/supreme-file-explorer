import { DirectoryT } from "../fileExplorer/types";

export interface SubDirectoryPropsT {
  directories: DirectoryT[];
  currentPath: string;
}

export interface DirectoryItemPropsT {
  directory: DirectoryT;
  currentPath: string;
}

export interface ExpanderDirectoryPropsT {
  onClickExpand: () => void;
  onClickContract: () => void;
  isExpanded: boolean;
}
