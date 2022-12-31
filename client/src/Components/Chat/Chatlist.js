import { Box, Divider } from "@mui/material";
import ChatHeader from "./MiniChat/ChatListHeader";
import ChatListItem from "./MiniChat/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../Store/store";
import { useEffect } from "react";
import axios from "axios";

function Chatlist() {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const chatList = useSelector((state) => state.chat.chatList);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(user.token.length === 0)
      return;
    const getChatList = async () => {
      try {
        const list = await axios.get("http://localhost:3010/chat", {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        });
        dispatch(chatActions.setChatList(list.data));
      } catch (error) {
        console.log(error);
      }
    };
    getChatList();
  }, [user.token, dispatch, user.token.length]);

  return (
    <Box sx={__Chatlist_box}>
      <ChatHeader />
      <Divider />
      <Box>
        {chatList.length > 0 ? chatList.map(chat => (<ChatListItem chat={chat} key={chat._id} />)) : null}
      </Box>
    </Box>
  );
}

export default Chatlist;

// Styles

const __Chatlist_box = {
  flex: "30%",
  width: "100%",
  backgroundColor: "#faf9f9",
  height: "91vh",
  borderRight: "1px solid #E6E6E6",
  overflowY: "scroll",
};
