import React, { ReactElement } from "react";
import { useDrag } from "react-dnd";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { FileT } from "../fileExplorer/types";
import { ImageTitlePreview } from "./styled";
import { getNameFromPath } from "../../utils";

function FilePreviewer(props: FileT): ReactElement {
  const [{ isDragging }, drag] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "FILE",
    item: { path: props.path },
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <>
      <Card sx={{ width: 150 }} ref={drag}>
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
