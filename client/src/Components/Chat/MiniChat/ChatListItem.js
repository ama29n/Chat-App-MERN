import { Box, Divider, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";

function ChatListItem({ chat }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  let name,
    sender = null,
    profilePhoto;
  if (chat.chatName === "sender") {
    if (chat.users[0].name === user.name) {
      name = chat.users[1].name;
      profilePhoto = chat.users[1].profilePhoto;
    } else {
      name = chat.users[0].name;
      profilePhoto = chat.users[0].profilePhoto;
    }
  } else {
    name = chat.chatName;
  }
  if (chat.latestMessage && chat.latestMessage.sender.name === user.name) {
    sender = "You";
  } else if (chat.latestMessage) {
    sender = chat.latestMessage.sender.name.split(" ")[0];
  }
  // Function to select a chat
  const selectHandler = (e) => {
    e.preventDefault();
    if (JSON.stringify(selectedChat._id) !== JSON.stringify(chat._id)) {
      dispatch(chatActions.setChatMessages([]));
      dispatch(chatActions.setSelectedChat(chat));
    }
  };
  return (
    <>
      <Box
        sx={__ChatListItem_box}
        key={chat._id}
        id={chat._id}
        onClick={selectHandler}
      >
        <Box id={chat._id} width="50px" height="50px">
          <img
            id={chat._id}
            alt="user"
            src={profilePhoto}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
          />
        </Box>

        <Box>
          <p id={chat._id} style={{ color: "#212529" }}>
            {name}
          </p>
          {sender && (
            <Box display="flex" gap="0.25rem" alignItems="center">
              <p
                id={chat._id}
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#212529",
                }}
              >
                {sender}:
              </p>
              <Box width="140px" sx={__ChatListItem_message_box}>
                <Tooltip title={chat.latestMessage.content} placement="right">
                  <p id={chat._id} style={__ChatListItem_message_box_message}>
                    {chat.latestMessage.content}
                  </p>
                </Tooltip>
              </Box>
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
  height: "88px",
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
};

const __ChatListItem_message_box = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const __ChatListItem_message_box_message = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#495057",
};
