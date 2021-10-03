import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentFiles,
  selectCurrentFolders,
} from "../fileExplorer/fileExplorerSlice";
import FilePreviewer from "./FilePreviewer";
import Folder from "./Folder";
import { GridContentArea } from "./styled";

function ContentArea() {
  const currentFiles = useSelector(selectCurrentFiles);
  const currentFolders = useSelector(selectCurrentFolders);
  return (
    <GridContentArea>
      {currentFolders.map((x) => (
        <Folder key={x.path} path={x.path} />
      ))}
      {currentFiles.map((x) => (
        <FilePreviewer key={x.path} {...x} />
      ))}
    </GridContentArea>
  );
}

export default ContentArea;
