import React, { ReactElement } from "react";
import DirectoryItem from "./DirectoryItem";
import { GridDirectory } from "./styled";
import { SubDirectoryPropsT } from "./types";

function DirectoryList(props: SubDirectoryPropsT): ReactElement {
  return (
    <GridDirectory>
      {props.directories.map((x) => (
        <DirectoryItem
          key={x.path}
          directory={x}
          currentPath={props.currentPath}
        />
      ))}
    </GridDirectory>
  );
}

export default DirectoryList;
