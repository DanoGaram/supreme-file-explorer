import React, { ReactElement } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeSearchTerm,
  selectSearchTerm,
} from "../fileExplorer/fileExplorerSlice";

function SearchInput(): ReactElement {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  return (
    <TextField
      label="Search"
      id="outlined-start-adornment"
      sx={{ m: 1 }}
      value={searchTerm}
      onChange={(e) => dispatch(onChangeSearchTerm(e.target.value))}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
