import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function ChatHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#0d1b2a"
      }}
    >
      <Box fontSize="1.5rem" color="white">My Chats</Box>
      <Button variant="outlined" endIcon={<AddIcon />}>New Group</Button>
    </Box>
  );
}

export default ChatHeader;
