import { Box } from "@mui/material";

function SenderMessage({ id, message }) {
  return (
    <Box
      id={id}
      key={id}
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
      <p>{message}</p>
    </Box>
  );
}

export default SenderMessage;
