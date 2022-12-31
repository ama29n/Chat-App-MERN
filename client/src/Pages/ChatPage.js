import Header from "../Components/Chat/Navbar";
import { Box } from "@mui/material";
import Chatlist from "../Components/Chat/Chatlist";
import Chatbox from "../Components/Chat/Chatbox";
// import background from "../Resources/bg-2.jpg";

function ChatPage() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={__ChatPage_background_box}></Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Chatlist />
        <Chatbox />
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
