import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentPath,
  selectDirectory,
} from "../fileExplorer/fileExplorerSlice";
import DirectoryList from "./DirectoryList";

function DirectoryNavigation() {
  const directories = useSelector(selectDirectory);
  const currentPath = useSelector(selectCurrentPath);

  return <DirectoryList directories={directories} currentPath={currentPath} />;
}

export default DirectoryNavigation;
