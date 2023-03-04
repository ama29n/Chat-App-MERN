import { Box } from "@mui/material";

function SenderMessage({ message }) {
  // Date and Time
  var createdAt = message.createdAt;
  var s = new Date(createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  let idx = s.length - 2;
  let arr = s.split("");
  arr.splice(idx - 4, 3);
  s = arr.join("");
  // Sender
  let sender = message.sender.name;
  return (
    <Box
      id={message._id}
      key={message._id}
      sx={{
        maxWidth: "70%",
        width: "fit-content",
        overflowWrap: "break-word",
        margin: "0.5rem 0",
        borderRadius: "5px",
        padding: "0.5rem",
        backgroundColor: "#1976D2",
        color: "white",
      }}
    >
      {message.chat.isGroupChat && (<p style={{
        marginBottom: "10px",
        fontSize: "10px",
        fontWeight: "600",
        color: "#f1f1f1",
      }}>
        {sender}
      </p>)}
      <p>{message.content}</p>
      <p style={{
        marginTop: "10px",
        fontSize: "10px",
        fontWeight: "600",
        color: "#f1f1f1",
      }}>{s}</p>
    </Box>
  );
}

export default SenderMessage;
