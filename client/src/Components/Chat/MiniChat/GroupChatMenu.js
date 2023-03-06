import * as React from 'react';
import { Box, Button, Dialog, DialogContent, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function GroupChatMenu({ chat }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(chat);
  return (
    <div>
      <Tooltip title="About">
        <Button variant="outlined" onClick={handleClickOpen}>
          <MenuIcon />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                "@media(max-width: 800px)": {
                    width: "100%"
                }
            }}>
            <Box fontSize="20px">{chat.chatName}</Box>
            <Box>
              <Box>
                {`Created by: ${chat.groupAdmin.name}`}
              </Box>
            </Box>
            <Box width="100%">
                {chat.users.map((user) => {
                return (
                    <Box key={user._id} display="flex" padding="1rem 0.25rem" gap="1rem" alignItems="center">
                        <Box width="50px" height="50px">
                            <img
                                id={user._id}
                                style={{ height: "auto", width: "100%", borderRadius: "50%", border: "2px solid #d6d6d7" }}
                                alt="listUser"
                                src={user.profilePhoto}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <p style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#212529",
                            }}>{user.name}</p>
                            <p style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#495057",
                            }}>{user.email}</p>
                        </Box>
                    </Box>
                )
                })}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}