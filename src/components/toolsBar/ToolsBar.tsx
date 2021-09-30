import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import NavigationArrows from "./NavigationArrows";
import NewFolder from "./NewFolder";
import SearchInput from "./SearchInput";

function ToolsBar(): ReactElement {
  return (
    <Box display="flex">
      <NavigationArrows />
      <SearchInput />
      <NewFolder />
    </Box>
  );
}

export default ToolsBar;
