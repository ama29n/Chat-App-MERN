import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../Common/CustomInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddGroupListItem from "./AddGroupListItem";
// import { chatActions } from "../../../Store/store";

function AddGroup() {
  // Dialog state
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSearchedUserList("");
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
  // State for searched user list
  const [searchedUserList, setSearchedUserList] = useState([]);
  // Function to fetch users from server
  const findSearchedUserHandler = async (e) => {
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
      alert(error.response.data);
      setIsListLoading(false);
    }
  };
  // State for selected users to be added in group
  const [selectedMembers, setSelectedMembers] = useState([]);
  // Function to select user to be added in the group 
  const addUserToGroupHandler = (e) => {
    let found = false;
    for(let i = 0; i < selectedMembers.length; i++) {
      if(JSON.stringify(selectedMembers[i]) === JSON.stringify(e.target.id)) {
        found = true;
        break;
      }
    }
    if(found === true) {
      alert("User already selected");
      return;
    }
    setSelectedMembers([e.target.id, ...selectedMembers]);
    console.log(selectedMembers);
  }

  // Function to create group
  const createGroupHandler = async () => {
    try {
      const response = axios.post(URL + "/chat/group/create", { groupName: "No Cheating Group", users: selectedMembers }, 
      {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        disableElevation
      >
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={__AddGroup_box}>
            <CustomInput
              value={searchedUser}
              changeHandler={searchedUserChangeHandler}
              placeholder="Enter name or email"
            />
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
                      />
                    ))
                  : null}
                  {isListLoading ? <CircularProgress /> : null}
              </Box>
            ) : null}
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

const __AddGroup_userlist_box = {
  overflowY: "scroll",
  height: "240px",
  width: "470px",
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #d6d6d7",
};

const __AddGroup_search_info_text = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#495057",
};
