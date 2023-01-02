import { Box } from "@mui/material";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../Store/store";
import axios from "axios";

var selectedChatCompare;

function ChatMessages({ socket }) {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_URL;

  const user = useSelector((state) => state.user);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const messages = useSelector((state) => state.chat.chatMessages);

  // To load the messages
  const getMessages = useCallback(async () => {
    const response = await axios.get(URL + "/message/" + selectedChat._id, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    dispatch(chatActions.setChatMessages(response.data));
    socket.emit("join chat", selectedChat._id);
  }, [selectedChat, URL, user, socket, dispatch]);

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat, getMessages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || JSON.stringify(newMessageRecieved.chat._id) !== JSON.stringify(selectedChatCompare._id)) {
        // give notification
      } else {
        getMessages();
      }
    })
  });

  // Scroll to Bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <Box sx={__ChatMessages_box}>
      {messages.length > 0 ? (
        messages.map(message => {
            if(message.sender.name === user.name) {
                return <ReceiverMessage key={message._id} id={message._id} message={message.content} />
            } else {
                return <SenderMessage key={message._id} id={message._id} message={message.content} />
            }
        })
      ) : null}
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default ChatMessages;

// Styles

const __ChatMessages_box = {
  padding: "0 2rem",
  overflowY: "scroll",
  position: "absolute",
  width: "100%",
  bottom: "70px",
  height: "calc(91vh - 148px)",
};
