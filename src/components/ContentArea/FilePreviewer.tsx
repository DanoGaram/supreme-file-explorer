import React, { ReactElement } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { FileT } from "../fileExplorer/types";
import { ImageTitlePreview } from "./styled";
import { getNameFromPath } from "../../utils";

function FilePreviewer(props: FileT): ReactElement {
  return (
    <>
      <Card sx={{ width: 150 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={props.src}
            alt="green iguana"
          />
          <CardContent>
            <ImageTitlePreview gutterBottom variant="body1">
              {getNameFromPath(props.path)}
            </ImageTitlePreview>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default FilePreviewer;
