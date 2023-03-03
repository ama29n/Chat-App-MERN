import { Box } from "@mui/material";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";

function ChatHeader() {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     backgroundColor: "White",
    //     height: "70px",
    //     justifyContent: "center",
    //   }}
    // >
      
    // </Box>
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
    }}>
      <AddUser />
      <AddGroup />
    </Box>
  );
}

export default ChatHeader;
