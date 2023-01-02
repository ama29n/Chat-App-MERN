import { Box } from "@mui/material";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ChatMessages() {
  const URL = process.env.REACT_APP_URL;

  const user = useSelector((state) => state.user);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const [messages, setMessages] = useState([]);
  
  // To load the messages
  useEffect(() => {
    const getMessages = async () => {
        const response = await axios.get(URL + "/message/" + selectedChat._id, {
            headers: {
                "Authorization": "Bearer " + user.token,
            },
        });
        console.log(response.data);
        setMessages(response.data);
    };
    getMessages();
  }, [selectedChat, URL, user]);


  // Scroll to Bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom()
  }, []);

  return (
    <Box sx={__ChatMessages_box}>
      {messages.length > 0 ? (
        messages.map(message => {
            if(message.sender.name === user.name) {
                return <ReceiverMessage id={message._id} message={message.content} />
            } else {
                return <SenderMessage id={message._id} message={message.content} />
            }
        })
      ) : null}
      {/* <SenderMessage message="Hey" />
      <ReceiverMessage message="Hi you" />
      <SenderMessage message="How are you" />
      <ReceiverMessage message="I am good" />
      <ReceiverMessage message="You say" />
      <SenderMessage message="I am also good" />
      <ReceiverMessage message="That is good" />
      <SenderMessage message="It's been a long time since we have met" />
      <SenderMessage message="Let's meet soon" />
      <ReceiverMessage message="That is true" />
      <ReceiverMessage message="Yeah! let's meet on Sunday" />
      <ReceiverMessage message="If you are free" />
      <SenderMessage message="Yes, I am free" />
      <SenderMessage message="Meet me at city restaurant at 12 pm on Sunday" />
      <SenderMessage message="Looking forward to it" />
      <ReceiverMessage property="end" message="Okay! great" /> */}
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
