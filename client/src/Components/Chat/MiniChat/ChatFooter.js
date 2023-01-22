import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";
import axios from "axios";

function ChatFooter({ socket }) {
  // URL
  const URL = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.chatMessages);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user);
  // State to manage message
  const [message, setMessage] = useState("");
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  // State to manage loading
  const [isLoading, setIsLoading] = useState(false);
  // Function to send message to a user
  const messageSendHandler = async (e) => {
    if(message.length === 0)
      return;
    setIsLoading(true);
    try {
      const msg = message;
      setMessage("");
      const response = await axios.post(
        URL + "/message",
        { chatId: selectedChat._id, message: msg },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      socket.emit("new message", response.data);
      dispatch(chatActions.setChatMessages([...messages, response.data]));
      dispatch(chatActions.updateLatestMessage({ chatId: selectedChat._id, message: response.data }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box sx={__ChatFooter_box}>
      <Box flexGrow="1">
        <input
          value={message}
          onChange={messageChangeHandler}
          placeholder="Write a message..."
          style={__ChatFooter_input}
          onKeyDown={(e) => { if(e.key === "Enter" && !isLoading) messageSendHandler(); }}
        />
      </Box>
      <Button
        disabled={isLoading ? true : false}
        onClick={messageSendHandler}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  );
}

export default ChatFooter;

// Styles

const __ChatFooter_box = {
  height: "70px",
  padding: "1rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  position: "absolute",
  width: "100%",
  bottom: 0,
};

const __ChatFooter_input = {
  outline: "none",
  padding: "0.75rem 1rem",
  borderRadius: "5px",
  fontSize: "1rem",
  border: "2px solid #3B8AD9",
  color: "#212529",
  width: "100%",
};
