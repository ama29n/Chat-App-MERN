import { Box } from "@mui/material";
import AddGroup from "./AddGroup";
import AddUser from "./AddUser";

function ChatHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "White",
        height: "70px",
        justifyContent: "center",
        "@media(max-width: 1260px)": {
          height: "120px"
        },
        "@media(max-width: 700px)": {
          height: "200px"
        },
      }}
    >
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        "@media(max-width: 1260px)": {
          flexDirection: "column",
          gap: "1rem"
        }
      }}>
        <AddUser />
        <AddGroup />
      </Box>
      {/* <Divider />
      <Box fontSize="1.5rem" color="#495057" fontWeight="400" p="1rem">
        My Chats
      </Box> */}
    </Box>
  );
}

export default ChatHeader;
