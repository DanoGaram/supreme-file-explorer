import { DirectoryT, fileSeparator } from "./components/fileExplorer/types";

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
    const uniquePaths =
      basePath !== fileSeparator
        ? new Set(
            files.map((x) => {
              const partialPathIndex = x.path.indexOf(
                fileSeparator,
                basePath.length
              );
              return x.path.substring(0, partialPathIndex);
            })
          )
        : new Set(["/"]);
    uniquePaths.forEach((path) => {
      if (path) {
        const subPaths = files.filter(
          (x) => x.path.startsWith(path) && x.path !== path
        );
        const containedItems = subPaths.filter((x) => !x.isFolder).length;
        const currentDirectory: DirectoryT = {
          path,
          containedItems,
          subDirectories: createDirectory(subPaths, path + fileSeparator),
        };
        directories.push(currentDirectory);
      }
    });
    return directories;
  }
}
