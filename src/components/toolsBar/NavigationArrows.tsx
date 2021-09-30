import React, { ReactElement } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  onNextPath,
  onPrevPath,
  selectNavigationPathAvailability,
} from "../fileExplorer/fileExplorerSlice";

function NavigationArrows(): ReactElement {
  const dispatch = useDispatch();
  const navigationAvailability = useSelector(selectNavigationPathAvailability);
  return (
    <>
      <IconButton
        disabled={!navigationAvailability.allowPrev}
        onClick={() => dispatch(onPrevPath())}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        disabled={!navigationAvailability.allowNext}
        onClick={() => dispatch(onNextPath())}
      >
        <ArrowForwardIcon />
      </IconButton>
    </>
  );
}

export default NavigationArrows;
