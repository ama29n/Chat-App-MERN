import { Box, Divider } from "@mui/material";
import ChatHeader from "./MiniChat/ChatListHeader";
import ChatListItem from "./MiniChat/ChatListItem";

function Chatlist() {
  return (
    <Box sx={{
      flex: "30%",
      width: "100%",
      // backgroundColor: "#202C33",
      // backgroundColor: "#111B21",
      // backgroundColor: "#051923",
      backgroundColor: "#03141F",
      height: "91vh",
      borderRight: "1px solid #272E34",
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