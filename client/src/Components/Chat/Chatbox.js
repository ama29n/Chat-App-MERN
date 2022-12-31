import { Box } from "@mui/material";
import background from "../../Resources/bg-10.jpg";

function Chatbox() {
  return (
    <Box
      sx={{
        flex: "70%",
        width: "100%",
        backgroundColor: "White",
        height: "91vh",
        padding: "2rem",
        overflowY: "scroll",
        borderBottom: "8px solid #1976D2",
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
      }}
    >
    </Box>
  );
}

export default Chatbox;