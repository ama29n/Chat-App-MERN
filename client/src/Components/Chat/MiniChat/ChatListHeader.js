import { Box, Divider } from "@mui/material";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";

function ChatHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "White",
      }}
    >
      <Box display="flex" justifyContent="space-between" p="1rem">
        <AddUser />
        <AddGroup />
      </Box>
      <Divider />
      <Box fontSize="1.5rem" color="#495057" fontWeight="500" p="1rem">
        My Chats
      </Box>
    </Box>
  );
}

export default ChatHeader;
