import { Box, Divider } from "@mui/material";
import userImage from "../../../Resources/ProfilePicture.jpg";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";

function ChatListItem({ chat }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let name, sender = null;
  if(chat.chatName === "sender") {
    if(chat.users[0].name === user.name) {
      name = chat.users[1].name;
    } else {
      name = chat.users[0].name;
    }
  } else {
    name = chat.chatName;
  }
  if(chat.latestMessage && chat.latestMessage.sender.name === user.name) {
    sender = "You";
  } else if(chat.latestMessage) {
    sender = chat.latestMessage.sender.name.split(" ")[0];
  }
  const selectHandler = (e) => {
    e.preventDefault();
    dispatch(chatActions.setSelectedChat(chat));
  };
  return (
    <>
      <Box sx={__ChatListItem_box} key={chat._id} id={chat._id} onClick={selectHandler}>
        <Box id={chat._id} width="50px" height="50px">
          <img
            id={chat._id}
            alt="user"
            src={userImage}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
          />
        </Box>

        <Box>
          <p id={chat._id} style={{ color: "#212529"}}>{name}</p>
          {sender && (
            <Box display="flex" gap="0.25rem" alignItems="center">
              <p id={chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#212529" }}>{sender}:</p>
              <Box width="140px" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}><p id={chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{chat.latestMessage.content}</p></Box>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
    </>
  );
}

export default ChatListItem;

// Styles 

const __ChatListItem_box = {
  display: "flex",
  padding: "0.75rem 1rem",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
  color: "black",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f3f4",
  },
};