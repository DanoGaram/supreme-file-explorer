import React, { ReactElement } from "react";
import { useDrop, useDrag } from "react-dnd";
import FolderIcon from "@mui/icons-material/Folder";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { FolderIconContainer, ImageTitlePreview } from "./styled";
import { useDispatch } from "react-redux";
import { moveContent, onChangePath } from "../fileExplorer/fileExplorerSlice";
import { getNameFromPath } from "../../utils";

function Folder(props: { path: string }): ReactElement {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "FOLDER",
    item: { path: props.path, isFolder: true },
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ["FILE", "FOLDER"],
    drop: (item: { path: string; isFolder?: boolean }) =>
      dispatch(
        moveContent({
          path: item.path,
          newPath: props.path,
          isFolder: item.isFolder,
        })
      ),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: (item: { path: string; isFolder?: boolean }) =>
      !props.path.startsWith(item.path),
  }));
  return (
    <Card sx={{ width: 150 }} ref={drop}>
      <CardActionArea
        onClick={() => dispatch(onChangePath(props.path))}
        ref={drag}
      >
        <FolderIconContainer>
          <FolderIcon style={{ fontSize: "90px" }} />
        </FolderIconContainer>
        <CardContent>
          <ImageTitlePreview gutterBottom variant="body1">
            {getNameFromPath(props.path)}
          </ImageTitlePreview>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Folder;
