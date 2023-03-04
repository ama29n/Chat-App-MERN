import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../Common/CustomInput";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";
import axios from "axios";
import AddGroupListItem from "./AddGroupListItem";
import PopupMessage from "../../Common/PopupMessage";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import { chatActions } from "../../../Store/store";

function AddGroup({ setViewChatListFalse }) {
  const dispatch = useDispatch();
  // State for selected users to be added in group
  const [selectedMembers, setSelectedMembers] = useState([]);
  // Dialog state
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSearchedUserList("");
    setSelectedMembers([]);
    setGroupName("");
    setSearchedUser("");
    setOpen(false);
  };
  // URL
  const URL = process.env.REACT_APP_URL;
  // const dispatch = useDispatch();
  // Fetching user from store
  const user = useSelector(state => state.user);
  // State for input field
  const [searchedUser, setSearchedUser] = useState("");
  const searchedUserChangeHandler = (e) => {
    setSearchedUser(e.target.value);
  };
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
      setSearchedUserList(response.data);
      setIsListLoading(false);
    } catch (error) {
      setMessage(error.response.data);
      openErrorMessage();
      setIsListLoading(false);
    }
  };
  // Function to select user to be added in the group 
  const addUserToGroupHandler = (e) => {
    let found = false;
    for(let i = 0; i < selectedMembers.length; i++) {
      if(JSON.stringify(selectedMembers[i]._id) === JSON.stringify(e._id)) {
        found = true;
        break;
      }
    }
    if(found === true) {
      alert("User already selected");
      return;
    }
    setSelectedMembers([e, ...selectedMembers]);
    console.log(e);
  }
  // Function to remove member from selected list 
  const removeFromSelectedMembersHandler = (e) => {
    console.log(e);
    const arr = [...selectedMembers];
    for(let i = 0; i < arr.length; i++) {
      if(JSON.stringify(arr[i]._id) === JSON.stringify(e)) {
        arr.splice(i, 1);
        break;
      }
    }
    setSelectedMembers(arr);
  }
  // State to manage group name
  const [groupName, setGroupName] = useState("");
  const groupNameChangeHandler = (e) => {
    setGroupName(e.target.value);
  }
  // Function to create group
  const createGroupHandler = async () => {
    if(groupName === "") {
      alert("Enter group name");
      return;
    }
    if(selectedMembers.length === 0) {
      alert("Select users to be added in the group");
      return;
    }
    let userIds = selectedMembers.map((user) => user._id);
    console.log(userIds);
    try {
      const response1 = await axios.post(URL + "/chat/group/create", { groupName: groupName, users: userIds }, 
      {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      dispatch(chatActions.setSelectedChat(response1.data));
      const response2 = await axios.get(URL + "/chat", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      dispatch(chatActions.setChatList(response2.data));
      setViewChatListFalse();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disableElevation
        // disabled
        endIcon={<AddIcon />}
      >
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={__AddGroup_box}>
          <CustomInput
              value={groupName}
              changeHandler={groupNameChangeHandler}
              placeholder="Enter group name"
            />
            <CustomInput
              value={searchedUser}
              changeHandler={searchedUserChangeHandler}
              placeholder="Enter name or email"
            />
            {selectedMembers.length > 0 && (
              <Box display="flex" flexDirection="column" width="100%">
                {selectedMembers.map((user) => {
                  return (
                    <Box
                      sx={{
                        padding: "0.5rem 0.25rem",
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #d6d6d7",
                      }}
                      key={user._id}
                    >
                      <p>{user.name}</p>
                      <Button onClick={() => removeFromSelectedMembersHandler(user._id)} variant="outlined"><PersonRemoveIcon /></Button>
                    </Box>
                  );
                })}
              </Box>
            )}
            {searchedUserList.length < 1 ? (
              <p style={__AddGroup_search_info_text}>
                Search with empty field to see all users
              </p>
            ) : null}
            {searchedUserList.length > 0 ? (
              <Box sx={__AddGroup_userlist_box}>
                {searchedUserList.length > 0
                  ? searchedUserList.map((listUser) => (
                      <AddGroupListItem
                        listUser={listUser}
                        addUserToGroupHandler={addUserToGroupHandler}
                        key={listUser._id}
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
            onClick={createGroupHandler}
          >
            Create
          </Button>
          <Button
            variant="outlined"
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

export default AddGroup;

const __AddGroup_box = {
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  "@media(max-width: 800px)": {
    width: "100%",
  }
};

const __AddGroup_userlist_box = {
  overflowY: "scroll",
  height: "240px",
  width: "470px",
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #d6d6d7",
  "@media(max-width: 800px)": {
    width: "100%"
  }
};

const __AddGroup_search_info_text = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#495057",
};
