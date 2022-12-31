import { Box, Divider } from "@mui/material";
import userImage from "../../../Resources/ProfilePicture.jpg";

function ChatListItem() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "0.75rem 1rem",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1rem",
          color: "black",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f3f4",
          },
        }}
      >
        <Box width="50px" height="50px">
          <img
            alt="user"
            src={userImage}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
          />
        </Box>

        <Box>
          <p style={{ color: "#212529"}}>Amandeep Singh</p>
          <p style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>
            Hello this is a message
          </p>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}

export default ChatListItem;