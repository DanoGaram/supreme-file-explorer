import { Box } from "@mui/system";
import React from "react";
import ContentArea from "../ContentArea";
import Directory from "../directory/DirectoryNavigation";

function FileExplorer() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "auto",
        gridTemplateAreas: `"tools tools tools tools"
    "directory contentArea contentArea contentArea"
    "directory contentArea contentArea contentArea"`,
      }}
    >
      <Box sx={{ gridArea: "tools", backgroundColor: "#bad6f1" }}>Tools</Box>
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
