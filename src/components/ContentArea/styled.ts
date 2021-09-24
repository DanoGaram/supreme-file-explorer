import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const GridContentArea = styled("div")({
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  padding: "10px",
});

export const ImageTitlePreview = styled(Typography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const FolderIconContainer = styled("div")({
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
