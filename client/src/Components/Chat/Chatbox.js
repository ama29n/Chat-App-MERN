import { Box } from "@mui/material";
import background from "../../Resources/bg-10.jpg";
import { useSelector } from "react-redux";
import ChatHeader from "./MiniChat/ChatHeader";

function Chatbox() {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  return (
    <Box
      sx={{
        flex: "70%",
        width: "100%",
        backgroundColor: "White",
        height: "91vh",
        overflowY: "scroll",
        borderBottom: "8px solid #1976D2",
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
      }}
    >
      {selectedChat._id && (
        <Box>
          <ChatHeader chat={selectedChat} />
        </Box>
      )}
    </Box>
  );
}

export default Chatbox;
