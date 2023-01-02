import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../Common/CustomInput";
import { useState } from "react";

function AddGroup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        disabled
      >
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>

        <DialogContent>
          <Box sx={__AddGroup_box}>
            <CustomInput />
            <Box marginTop="20px" width="450px" height="240px" sx={{ overflowY: "scroll" }} display="flex" flexDirection="column" boxShadow="1px 1px 10px #f1f1f1">

            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Create Group</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>Cancel</Button>
        </DialogActions>
        
      </Dialog>
    </>
  );
}

export default AddGroup;

const __AddGroup_box = {
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};
