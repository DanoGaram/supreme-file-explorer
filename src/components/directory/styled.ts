import { styled } from "@mui/system";

export const GridDirectory = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginLeft: "5px",
});

export const DirectoryNameWrap = styled("div")({
  display: "flex",
  gap: "10px",
  "&.active": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});
