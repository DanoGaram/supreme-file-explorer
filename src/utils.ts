import {
  DirectoryT,
  fileSeparator,
  FileT,
  rootPath,
} from "./components/fileExplorer/types";

/**
 * Get a name based on the path taking the last part after the last separator
 * @param path The file path
 * @returns A formmated name
 */
export function getNameFromPath(path: string): string {
  if (path === fileSeparator) {
    return "root";
  }
  const indexLastSeparator = path.lastIndexOf(fileSeparator);
  return path.substring(indexLastSeparator + 1, path.length);
}

/**
 * Creates a nested directory based on files path
 * @param files files composed by path and isFolder flag
 * @param basePath indicates the path where the directory is going to be created
 * @returns the nested directory
 */
export function createDirectory(
  files: { path: string; isFolder?: boolean }[],
  basePath: string
): DirectoryT[] {
  if (files.length === 0) {
    return [];
  } else {
    const directories: DirectoryT[] = [];
    const childrenPaths: string[] = basePath
      ? files
          .filter(
            (x) =>
              x.isFolder &&
              x.path.indexOf(fileSeparator, basePath.length) === -1
          )
          .map((x) => x.path)
      : [rootPath];
    childrenPaths.forEach((path) => {
      if (path) {
        const subFiles = files.filter(
          (x) => x.path.startsWith(path) && x.path !== path
        );
        const containedItems = subFiles.filter((x) => !x.isFolder).length;
        const currentDirectory: DirectoryT = {
          path,
          containedItems,
          subDirectories: createDirectory(
            subFiles,
            path === rootPath ? rootPath : path + fileSeparator
          ),
        };
        directories.push(currentDirectory);
      }
    });
    return directories;
  }
}

/**
 * Indicates if a path have to be displayed or not in the current path
 * @param file
 * @param currentPath Current path
 * @param searchTerm String to search if the path includes the text
 * @param isFolder Indicates if you want to filter a folder path or a file path
 * @returns A boolean indicating if the path has to be shown
 */
export function filterPath(
  file: FileT,
  currentPath: string,
  searchTerm: string,
  isFolder: boolean
): boolean {
  const folderCondition =
    (isFolder && file.isFolder && file.path !== currentPath) ||
    (!isFolder && !file.isFolder);
  const isAtCurrentPath = !file.path
    .replace(currentPath, "")
    .includes(fileSeparator, 1);
  const isInSearchTerm = searchTerm
    ? getNameFromPath(file.path)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    : true;
  return (
    folderCondition &&
    file.path.startsWith(currentPath) &&
    ((searchTerm && isInSearchTerm) || (!searchTerm && isAtCurrentPath))
  );
}
