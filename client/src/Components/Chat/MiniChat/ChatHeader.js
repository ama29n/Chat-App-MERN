import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import groupProfile from "../../../Resources/ProfilePicture.jpg";

function Chat({ chat }) {
  const user = useSelector((state) => state.user);
  let name, profilePhoto;
  if(chat.isGroupChat) {
    name = chat.chatName;
    profilePhoto = groupProfile;
  } else {
    if(chat.users[0].name === user.name) {
      name = chat.users[1].name;
      profilePhoto = chat.users[1].profilePhoto;
    } else {
      name = chat.users[0].name;
      profilePhoto = chat.users[0].profilePhoto;
    }
  }
  return (
    <Box sx={{
      height: "70px",
      padding: "1rem",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }}>
        <Box id={chat._id} width="50px" height="50px">
          <img
            id={chat._id}
            alt="chat"
            src={profilePhoto}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
          />
        </Box>
        <p>{name}</p>
    </Box>
  );
}

export default Chat;