import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CustomInput from "../../Common/CustomInput";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";

function AddUser() {
  const dispatch = useDispatch();
  const [searchedUser, setSearchedUser] = useState("");
  const searchedUserChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSearchedUser("");
    setSearchedUserList([]);
    setOpen(false);
  };
  const user = useSelector(state => state.user);
  const searchedUserHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3010/user/search?input=${searchedUser}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setSearchedUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewUserHandler = async (e) => {
    try {
        const response1 = await axios.post("http://localhost:3010/chat", {userId: e.target.id}, {
            headers: {
                "Authorization": "Bearer " + user.token,
            },
        });
        dispatch(chatActions.setSelectedChat(response1.data));
        const response2 = await axios.get("http://localhost:3010/chat", {
            headers: {
                "Authorization": "Bearer " + user.token,
            },
        });
        dispatch(chatActions.setChatList(response2.data));
        handleClose();
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} endIcon={<PersonAddAltIcon />}>Search User</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={__AddGroup_box}>
            <CustomInput value={searchedUser} changeHandler={searchedUserChangeHandler} />
            <Box width="450px" height="200px" sx={{ overflowY: "scroll" }} display="flex" flexDirection="column" gap="1rem">
                {searchedUserList.length > 0 ? searchedUserList.map(listUser => {
                    return (
                        <Box>
                            <Box key={listUser._id} id={listUser._id} display="flex" gap="1rem" alignItems="center" padding="0.5rem" sx={{ cursor: "pointer"}} onClick={addNewUserHandler}>
                            <Box id={listUser._id} height="50px" width="50px"><img id={listUser._id} style={{ height: "auto", width: "100%", borderRadius: "50%" }} alt="listUser" src={listUser.profilePhoto} /></Box>
                            <Box id={listUser._id}>
                                <p id={listUser._id} style={{ color: "#212529"}}>{listUser.name}</p>
                                <p id={listUser._id} style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{listUser.email}</p>
                            </Box>
                        </Box>
                        <Divider />
                        </Box>
                    );
                }) : null}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={searchedUserHandler}>Search</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddUser;

const __AddGroup_box = {
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};
