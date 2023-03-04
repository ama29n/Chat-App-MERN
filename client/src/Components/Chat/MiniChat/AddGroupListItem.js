import { Box, Divider, Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function AddGroupListItem({ listUser, addUserToGroupHandler }) {
  return (
    <Box key={listUser._id}>
      <Box
        key={listUser._id}
        id={listUser._id}
        display="flex"
        gap="1rem"
        alignItems="center"
        padding="1rem"
        sx={{
          "@media(max-width: 800px)": {
            // flexDirection: "column",
            padding: "1rem 0.25rem",
            gap: "0"
          }
        }}
      >
        <Box id={listUser._id} height="50px" width="50px" sx={{
          "@media(max-width: 800px)": {
            display: "none"
          }}}>
          <img
            id={listUser._id}
            style={{ height: "auto", width: "100%", borderRadius: "50%" }}
            alt="listUser"
            src={listUser.profilePhoto}
          />
        </Box>
        <Box id={listUser._id}>
          <p id={listUser._id} style={{ color: "#212529" }}>
            {listUser.name}
          </p>
          <p
            id={listUser._id}
            style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}
          >
            {listUser.email}
          </p>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          id={listUser._id}
          onClick={() => addUserToGroupHandler(listUser)}
        >
          <PersonAddIcon />
        </Button>
      </Box>
      <Divider />
    </Box>
  );
}

export default AddGroupListItem;
