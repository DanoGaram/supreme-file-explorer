import { fileSeparator } from "./components/fileExplorer/types";

export function getNameFromPath(path: string): string {
  const indexLastSeparator = path.lastIndexOf(fileSeparator);
  return path.substring(indexLastSeparator + 1, path.length);
}
