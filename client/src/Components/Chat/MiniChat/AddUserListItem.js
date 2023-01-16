import { Box, Divider, Button } from "@mui/material";

function AddUserListItem({ listUser, createNewChat, isLoading }) {
  return (
    <Box key={listUser._id}>
      <Box
        key={listUser._id}
        id={listUser._id}
        display="flex"
        gap="1rem"
        alignItems="center"
        padding="1rem"
      >
        <Box id={listUser._id} height="50px" width="50px">
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
        <Button variant="outlined" id={listUser._id} onClick={createNewChat} disabled={isLoading}>Add</Button>
      </Box>
      <Divider />
    </Box>
  );
}

export default AddUserListItem;
