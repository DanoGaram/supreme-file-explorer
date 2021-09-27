import React, { ReactElement } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ExpanderDirectoryPropsT } from "./types";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

function ExpanderDirectory(props: ExpanderDirectoryPropsT): ReactElement {
  return (
    <>
      {!props.isExpanded && (
        <>
          <KeyboardArrowRightIcon
            fontSize="small"
            onClick={props.onClickExpand}
          />
          <FolderIcon />
        </>
      )}
      {props.isExpanded && (
        <>
          <KeyboardArrowDownIcon
            fontSize="small"
            onClick={props.onClickContract}
          />
          <FolderOpenIcon />
        </>
      )}
    </>
  );
}

export default ExpanderDirectory;
