import { Box } from "@mui/material";
import background from "../../Resources/bg-10.jpg";
import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "./MiniChat/ChatHeader";
import ChatFooter from "./MiniChat/ChatFooter";
import ChatMessages from "./MiniChat/ChatMessages";
import { useEffect } from "react";
import { notificationActions, chatActions } from "../../Store/store";
import io from "socket.io-client";

var ENDPOINT = process.env.REACT_APP_URL;
var socket;

function Chatbox({ viewChatList, performBack }) {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  let notifications = useSelector((state) => state.notification.notifications);
  const user = useSelector((state) => state.user);

  // IO CONNECTION
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connection", () => null);
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    if(selectedChat?._id) {
      return;
    }
    socket.on("message recieved", (newMessageRecieved) => {
      dispatch(chatActions.updateLatestMessage({ chatId: newMessageRecieved.chat._id, message: newMessageRecieved }));
      if(selectedChat && String(newMessageRecieved.chat._id) === String(selectedChat._id)) {
        return;
      } else {
        dispatch(notificationActions.setNotifications([newMessageRecieved, ...notifications]));
      }
    });
  });

  return (
    <Box
      sx={{
        width: "calc(100vw - 400px)",
        minWidth: "400px",
        backgroundColor: "White",
        height: "calc(100vh - 64px)",
        borderBottom: "8px solid #1976D2",
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        "@media(max-width: 800px)": {
          display: (viewChatList === false && selectedChat._id ? "initial" : "none"),
          width: "100%",
          minWidth: "0px"
        }
      }}
    >
      {selectedChat._id && (
        <Box position="relative" height="100%">
          <ChatHeader chat={selectedChat} performBack={performBack} />
          <Box>
            <ChatMessages socket={socket} />
          </Box>
          <ChatFooter socket={socket} />
        </Box>
      )}
    </Box>
  );
}

export default Chatbox;
