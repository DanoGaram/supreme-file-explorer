import { Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { getNameFromPath } from "../../utils";
import { moveContent, onChangePath } from "../fileExplorer/fileExplorerSlice";
import DirectoryList from "./DirectoryList";
import ExpanderDirectory from "./ExpanderDirectory";
import { DirectoryNameWrap } from "./styled";
import { DirectoryItemPropsT } from "./types";

function DirectoryItem(props: DirectoryItemPropsT): ReactElement {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ["FILE", "FOLDER"],
    drop: (item: { path: string; isFolder?: boolean }) =>
      dispatch(
        moveContent({
          path: item.path,
          newPath: props.directory.path,
          isFolder: item.isFolder,
        })
      ),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: (item: { path: string; isFolder?: boolean }) =>
      !props.directory.path.startsWith(item.path),
  }));

  return (
    <>
      <DirectoryNameWrap
        ref={drop}
        className={props.currentPath === props.directory.path ? "active" : ""}
      >
        <ExpanderDirectory
          isExpanded={isExpanded}
          onClickContract={() => setIsExpanded(false)}
          onClickExpand={() => setIsExpanded(true)}
        />
        <Typography
          onClick={() => dispatch(onChangePath(props.directory.path))}
        >
          {getNameFromPath(props.directory.path)}{" "}
          {props.directory.containedItems}
        </Typography>
      </DirectoryNameWrap>
      {isExpanded && props.directory.subDirectories.length > 0 && (
        <DirectoryList
          directories={props.directory.subDirectories}
          currentPath={props.currentPath}
        />
      )}
    </>
  );
}

export default DirectoryItem;
