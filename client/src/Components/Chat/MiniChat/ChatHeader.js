import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import groupProfile from "../../../Resources/ProfilePicture.jpg";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Chat({ chat }) {
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
        <Box id={chat._id} width="50px" height="50px">
          <img
            id={chat._id}
            alt="chat"
            src={profilePhoto}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
          />
        </Box>
        <p style={{ color: "#212529"}}>{name}</p>
        <Box sx={{ flexGrow: 1 }} />
        {!chat.isGroupChat && (
          <Box display="flex" gap="0.5rem">
            <MailOutlineIcon sx={{ color: "#495057"}} />
            <p style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{email}</p>
          </Box>
        )}
    </Box>
  );
}

export default Chat;