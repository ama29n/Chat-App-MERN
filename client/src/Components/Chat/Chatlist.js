import { Box, Divider } from "@mui/material";
import ChatHeader from "./MiniChat/ChatListHeader";
import ChatListItem from "./MiniChat/ChatListItem";

function Chatlist() {
  return (
    <Box sx={{
      flex: "30%",
      width: "100%",
      // backgroundColor: "#f8f9fa",
      backgroundColor: "#faf9f9",
      height: "91vh",
      borderRight: "1px solid #E6E6E6",
      overflowY: "scroll",
    }}>
      <ChatHeader />
      <Divider />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </Box>
  )
}

export default Chatlist;