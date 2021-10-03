import { Box } from "@mui/system";
import React from "react";
import ContentArea from "../ContentArea";
import Directory from "../directory/DirectoryNavigation";
import ToolsBar from "../toolsBar/ToolsBar";

function FileExplorer() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "auto",
        gridTemplateAreas: `"directory tools tools tools"
    "directory contentArea contentArea contentArea"
    "directory contentArea contentArea contentArea"`,
      }}
    >
      <Box sx={{ gridArea: "tools" }}>
        <ToolsBar />
      </Box>
      <Box sx={{ gridArea: "contentArea" }}>
        <ContentArea />
      </Box>
      <Box sx={{ gridArea: "directory" }}>
        <Directory />
      </Box>
    </Box>
  );
}

export default FileExplorer;
