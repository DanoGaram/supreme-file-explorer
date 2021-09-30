export interface FileT {
  path: string;
  isFolder?: boolean;
  src?: string;
}

export interface DirectoryT {
  path: string;
  containedItems: number;
  subDirectories: DirectoryT[];
}

export const fileSeparator = "/";

export const rootPath = "/";
