import Header from "../Components/Chat/Navbar";
import { Box } from "@mui/material";
import Chatlist from "../Components/Chat/Chatlist";
import Chatbox from "../Components/Chat/Chatbox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../Store/store";

function ChatPage() {
  const dispatch = useDispatch();
  // State to manage when to view chat list
  const [viewChatList, setViewChatList] = useState(true);
  const setViewChatListFalse = () => {
    setViewChatList(false);
  }
  // Function to perform back action in small viewports by clearing selected chat 
  const performBack = () => {
    setViewChatList(true);
    dispatch(chatActions.setSelectedChat({}));
  }
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <Box sx={__ChatPage_background_box}></Box>
      <Header />
      <Box display="flex" alignItems="center">
        <Chatlist viewChatList={viewChatList} setViewChatListFalse={setViewChatListFalse} />
        <Chatbox viewChatList={viewChatList} performBack={performBack} />
      </Box>
    </Box>
  );
}

export default ChatPage;

// Styles

const __ChatPage_background_box = {
  position: "absolute",
  zIndex: "-1",
  backgroundColor: "#f4f4f5",
  width: "100%",
  height: "100vh",
};
