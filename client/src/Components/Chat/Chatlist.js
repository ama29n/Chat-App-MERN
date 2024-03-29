import { Box, Divider, CircularProgress } from "@mui/material";
import ChatHeader from "./MiniChat/ChatListHeader";
import ChatListItem from "./MiniChat/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../Store/store";
import { useEffect, useState } from "react";
import axios from "axios";

function Chatlist({ viewChatList, setViewChatListFalse }) {
  const URL = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    if(user.token.length === 0)
      return;
    setIsLoading(true);
    const getChatList = async () => {
      try {
        const list = await axios.get(URL + "/chat", {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        });
        dispatch(chatActions.setChatList(list.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getChatList();
  }, [user.token, dispatch, user.token.length, URL]);
  
  return (
    <Box sx={{
      width: "400px",
      minWidth: "400px",
      backgroundColor: "#f6f6f6",
      height: "calc(100vh - 64px)",
      borderRight: "1px solid #E6E6E6",
      overflowY: "scroll",
      "@media(max-width: 800px)": {
        display: (viewChatList === true || !selectedChat._id ? "initial" : "none"),
        width: "100%",
        minWidth: "0px"
      }
    }}>
      <ChatHeader setViewChatListFalse={setViewChatListFalse} />
      <Divider />
      <Box>
        {chatList.length === 0 ? (<Box sx={__Chatlist_header}>No chats yet</Box>) : null}
        {isLoading && <Box marginTop="30px" display="flex" justifyContent="center"><CircularProgress /></Box>}
        {chatList.length > 0 ? chatList.map(chat => (<ChatListItem setViewChatListFalse={setViewChatListFalse} chat={chat} key={chat._id} />)) : null}
      </Box>
    </Box>
  );
}

export default Chatlist;

// Styles

const __Chatlist_header = {
  fontWeight: "400",
  color: "#212529",
  padding: "2rem 1rem",
  textAlign: "center",
};