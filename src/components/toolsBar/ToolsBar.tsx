import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import NavigationArrows from "./NavigationArrows";
import NewFiles from "./NewFiles";
import NewFolder from "./NewFolder";
import SearchInput from "./SearchInput";

function ToolsBar(): ReactElement {
  return (
    <Box display="flex">
      <NavigationArrows />
      <SearchInput />
      <NewFolder />
      <NewFiles />
    </Box>
  );
}

export default ToolsBar;
