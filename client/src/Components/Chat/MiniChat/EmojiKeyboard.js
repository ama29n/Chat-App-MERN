import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

// export default function EmojiKeyboard({ emojiHandler, inputRef }) {
  
// }

const EmojiKeyboard = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.focusHandler();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <EmojiEmotionsIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <EmojiPicker onEmojiClick={(e) => props.emojiHandler(e.emoji)} />
      </Dialog>
    </div>
  );
};

export default EmojiKeyboard;