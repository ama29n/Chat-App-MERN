import { Box, CircularProgress, Tooltip } from "@mui/material";
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
import AddUserListItem from "./AddUserListItem";
import PopupMessage from "../../Common/PopupMessage";

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
  const user = useSelector((state) => state.user);
  // State for input field
  const [searchedUser, setSearchedUser] = useState("");
  const searchedUserChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };
  // State for loading
  const [isLoading, setisLoading] = useState(false);
  // State for list loading
  const [isListLoading, setIsListLoading] = useState(false);
  // State for message
  const [message, setMessage] = useState("");
  // State to manage error message
  const [errorMessage, setErrorMessage] = useState(false);
  const openErrorMessage = () => {
    setErrorMessage(true);
  };
  const closeErrorMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(false);
  };
  // State for searched user list
  const [searchedUserList, setSearchedUserList] = useState([]);
  // Function to fetch users from server
  const findSearchedUserHandler = async (e) => {
    setSearchedUserList([]);
    setIsListLoading(true);
    try {
      const response = await axios.get(
        `${URL}/user/search?input=${searchedUser}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setIsListLoading(false);
      setSearchedUserList(response.data);
    } catch (error) {
      setIsListLoading(false);
      setMessage(error.response.data);
      openErrorMessage();
    }
  };
  // Function to create chat in the database of the user and selected user
  const createNewChat = async (e) => {
    try {
      setisLoading(true);
      const response1 = await axios.post(
        URL + "/chat",
        { userId: e.target.id },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      dispatch(chatActions.setSelectedChat(response1.data));
      const response2 = await axios.get(URL + "/chat", {
        headers: {
          Authorization: "Bearer " + user.token,
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
    <div>
      <Tooltip title="Add User">
        <Button variant="contained" disableElevation onClick={handleClickOpen}>
          <PersonAddAltIcon />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={__AddUser_box}>
            <CustomInput
              value={searchedUser}
              changeHandler={searchedUserChangeHandler}
              placeholder="Enter name or email"
            />
            {searchedUserList.length < 1 ? (
              <p style={__AddUser_search_info_text}>
                Search with empty field to see all users
              </p>
            ) : null}
            {searchedUserList.length > 0 ? (
              <Box sx={__AddUser_userlist_box}>
                {searchedUserList.length > 0
                  ? searchedUserList.map((listUser) => (
                      <AddUserListItem
                        listUser={listUser}
                        isLoading={isLoading}
                        createNewChat={createNewChat}
                      />
                    ))
                  : null}
              </Box>
            ) : null}
            {isListLoading ? <CircularProgress /> : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disableElevation
            onClick={findSearchedUserHandler}
          >
            Search
          </Button>
          <Button
            variant="text"
            disableElevation
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <PopupMessage
        open={errorMessage}
        handleClose={closeErrorMessage}
        severity="error"
        message={message}
      />
    </div>
  );
}

export default AddUser;

const __AddUser_box = {
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};

const __AddUser_userlist_box = {
  overflowY: "scroll",
  height: "240px",
  width: "470px",
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #d6d6d7",
};

const __AddUser_search_info_text = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#495057",
};
