import { Typography } from "@mui/material";
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

  return (
    <>
      <Typography variant="h5">File Explorer</Typography>
      <DirectoryList directories={directories} currentPath={currentPath} />
    </>
  );
}

export default DirectoryNavigation;
