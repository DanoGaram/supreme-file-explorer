import React, { ReactElement } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { FolderIconContainer, ImageTitlePreview } from "./styled";
import { useDispatch } from "react-redux";
import { onChangePath } from "../fileExplorer/fileExplorerSlice";
import { getNameFromPath } from "../../utils";

function Folder(props: { path: string }): ReactElement {
  const dispatch = useDispatch();
  return (
    <Card sx={{ width: 150 }}>
      <CardActionArea onClick={() => dispatch(onChangePath(props.path))}>
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
