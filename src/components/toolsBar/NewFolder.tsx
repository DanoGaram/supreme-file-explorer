import React, { ReactElement, useState } from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { onCreateFolder } from "../fileExplorer/fileExplorerSlice";

function NewFolder(): ReactElement {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleCreate = () => {
    dispatch(onCreateFolder(name));
    setName("");
    setIsOpen(false);
  };
  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <CreateNewFolderIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Folder Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            id="name"
            label="Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewFolder;
