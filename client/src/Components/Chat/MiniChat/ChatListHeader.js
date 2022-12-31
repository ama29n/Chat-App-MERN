import { Box } from "@mui/material";
import AddGroup from "./AddGroup";

function ChatHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "White",
      }}
    >
      <Box fontSize="1.5rem" color="#495057">My Chats</Box>
      <AddGroup />
    </Box>
  );
}

export default ChatHeader;
