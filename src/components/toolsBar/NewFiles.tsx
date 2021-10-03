import { IconButton } from "@mui/material";
import React, { ChangeEvent, ReactElement, useRef } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FileT } from "../fileExplorer/types";
import { useDispatch } from "react-redux";
import { onCreateFiles } from "../fileExplorer/fileExplorerSlice";

function NewFiles(): ReactElement {
  const dispatch = useDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: FileT[] = [];
      for (let i = 0; i < e.target.files?.length; i++) {
        files.push({
          path: e.target.files[i].name,
          src: URL.createObjectURL(e.target.files[i]),
        });
      }
      dispatch(onCreateFiles(files));
    }
    console.log(e);
  };
  return (
    <>
      <IconButton onClick={() => inputFileRef.current?.click()}>
        <UploadFileIcon />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputFileRef}
        onChange={handleChangeInputFile}
        style={{ opacity: 0 }}
      />
    </>
  );
}

export default NewFiles;
