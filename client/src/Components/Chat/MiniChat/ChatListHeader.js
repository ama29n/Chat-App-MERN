import { Box } from "@mui/material";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";

function ChatHeader({ setViewChatListFalse }) {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
    }}>
      <AddUser setViewChatListFalse={setViewChatListFalse} />
      <AddGroup setViewChatListFalse={setViewChatListFalse} />
    </Box>
  );
}

export default ChatHeader;
