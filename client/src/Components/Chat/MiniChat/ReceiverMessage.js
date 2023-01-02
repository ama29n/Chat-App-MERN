import { Box } from "@mui/material";

function ReceiverMessage({ id, message }) {
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
        marginLeft: "auto",
        backgroundColor: "White",
        color: "#212529",
      }}
    >
      <p>{message}</p>
    </Box>
  );
}

export default ReceiverMessage;
