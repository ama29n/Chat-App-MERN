import { Box, Tooltip, Button } from "@mui/material";
import { useSelector } from "react-redux";
import groupProfile from "../../../Resources/GroupProfilePicture.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupChatMenu from "./GroupChatMenu";

function Chat({ chat, performBack }) {
  const user = useSelector((state) => state.user);
  let name, profilePhoto, email;
  if(chat.isGroupChat) {
    name = chat.chatName;
    profilePhoto = groupProfile;
  } else {
    if(chat.users[0].name === user.name) {
      name = chat.users[1].name;
      profilePhoto = chat.users[1].profilePhoto;
      email = chat.users[1].email;
    } else {
      name = chat.users[0].name;
      profilePhoto = chat.users[0].profilePhoto;
      email = chat.users[0].email;
    }
  }
  return (
    <Box sx={{
      height: "70px",
      padding: "1rem",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      position: "absolute",
      width: "100%"
    }}>
        <Tooltip title="Back"><Button variant="outlined" onClick={performBack}><ArrowBackIcon /></Button></Tooltip>
        <Box id={chat._id} width="50px" height="50px">
          <img
            id={chat._id}
            alt="chat"
            src={profilePhoto}
            style={{ height: "auto", width: "100%", borderRadius: "50%", border: "2px solid #d6d6d7" }}
          />
        </Box>
        <Tooltip title={email} placement="right"><p style={{ color: "#212529", cursor: "pointer" }}>{name}</p></Tooltip>
        <Box flex="1"></Box>
        {chat.isGroupChat && <GroupChatMenu chat={chat} />}
    </Box>
  );
}

export default Chat;