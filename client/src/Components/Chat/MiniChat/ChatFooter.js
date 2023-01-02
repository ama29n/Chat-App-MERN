import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function ChatFooter() {
  const [message, setMessage] = useState("");
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  const messageSendHandler = async (e) => {
    e.preventDefault();
    setMessage("");
  };
  return (
    <Box
      sx={{
        height: "70px",
        padding: "1rem",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        position: "absolute",
        width: "100%",
        bottom: 0
      }}
    >
      <Box flexGrow="1">
        <input
          value={message}
          onChange={messageChangeHandler}
          placeholder="Write a message..."
          style={{
            outline: "none",
            padding: "0.75rem 1rem",
            borderRadius: "5px",
            fontSize: "1rem",
            border: "2px solid #3B8AD9",
            color: "#212529",
            width: "100%",
          }}
        />
      </Box>
      <Button
        onClick={messageSendHandler}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  );
}

export default ChatFooter;
