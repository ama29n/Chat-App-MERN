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
  // Dialog state
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSearchedUser("");
    setSearchedUserList([]);
    setOpen(false);
  };
  // URL
  const URL = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  // Fetching user from store
  const user = useSelector(state => state.user);
  // State for input field
  const [searchedUser, setSearchedUser] = useState("");
  const searchedUserChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };
  // Loader for after selecting the user
  const [isLoading, setisLoading] = useState(false);
  // State for searched user list
  const [searchedUserList, setSearchedUserList] = useState([]);
  // Function to fetch users from server
  const findSearchedUserHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${URL}/user/search?input=${searchedUser}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setSearchedUserList(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };
  // Function to create chat in the database of the user and selected user
  const createNewChat = async (e) => {
    try {
        setisLoading(true);
        const response1 = await axios.post(URL + "/chat", {userId: e.target.id}, {
            headers: {
                "Authorization": "Bearer " + user.token,
            },
        });
        dispatch(chatActions.setSelectedChat(response1.data));
        const response2 = await axios.get(URL + "/chat", {
            headers: {
                "Authorization": "Bearer " + user.token,
            },
        });
        dispatch(chatActions.setChatList(response2.data));
        setisLoading(false);
        handleClose();
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <Button variant="contained" disableElevation onClick={handleClickOpen} endIcon={<PersonAddAltIcon />}>Search User</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={__AddGroup_box}>
            <CustomInput value={searchedUser} changeHandler={searchedUserChangeHandler} placeholder="Enter name or email" />
            {searchedUserList.length < 1 ? <p style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>Search with empty field to see all users</p> : null}

            {searchedUserList.length > 0 ? 
              <Box marginTop="10px" width="470px" height="240px" sx={{ overflowY: "scroll" }} display="flex" flexDirection="column" border="1px solid #d6d6d7">
                {searchedUserList.length > 0 ? searchedUserList.map(listUser => {
                    return (
                        <Box key={listUser._id}>
                          <Box key={listUser._id} id={listUser._id} display="flex" gap="1rem" alignItems="center" padding="1rem">
                            <Box id={listUser._id} height="50px" width="50px"><img id={listUser._id} style={{ height: "auto", width: "100%", borderRadius: "50%" }} alt="listUser" src={listUser.profilePhoto} /></Box>
                            <Box id={listUser._id}>
                                <p id={listUser._id} style={{ color: "#212529"}}>{listUser.name}</p>
                                <p id={listUser._id} style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{listUser.email}</p>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button variant="outlined" id={listUser._id} onClick={createNewChat} disabled={isLoading}>Add</Button>
                          </Box>
                          <Divider />
                        </Box>
                    );
                }) : null}
              </Box>
            : null}

          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" disableElevation onClick={findSearchedUserHandler}>Search</Button>
          <Button variant="text" disableElevation onClick={handleClose} autoFocus>Cancel</Button>
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
