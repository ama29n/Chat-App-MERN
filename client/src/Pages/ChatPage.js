import Header from "../Components/Chat/Navbar";
import { Box } from "@mui/material";
import Chatlist from "../Components/Chat/Chatlist";
import Chatbox from "../Components/Chat/Chatbox";

function ChatPage() {
  return (
    <Box sx={{
      overflowY: "hidden",
      height: "100vh"
    }}>
      <Header />
      <Chatlist />
      <Chatbox />
    </Box>
  );
}

export default ChatPage;