import { Box } from "@mui/material";
import background from "../../Resources/bg-10.jpg";
import { useSelector } from "react-redux";
import ChatHeader from "./MiniChat/ChatHeader";
import ChatFooter from "./MiniChat/ChatFooter";
import ChatMessages from "./MiniChat/ChatMessages";
import { useEffect } from "react";
import io from "socket.io-client";

var ENDPOINT = process.env.REACT_APP_URL;
var socket;

function Chatbox() {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user);

  // IO CONNECTION
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => null);
  }, [user]);

  return (
    <Box
      sx={{
        flex: "70%",
        width: "100%",
        backgroundColor: "White",
        height: "91vh",
        borderBottom: "8px solid #1976D2",
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
      }}
    >
      {selectedChat._id && (
        <Box position="relative" height="100%">
          <ChatHeader chat={selectedChat} />
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
