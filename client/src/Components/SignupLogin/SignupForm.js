import { useState } from "react";
import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SecondaryButton from "../Common/SecondaryButton";

function SignupForm() {
  const [showVisibility, setShowVisibility] = useState(false);
  const showVisibilityHandler = () => {
    setShowVisibility((prev) => !prev);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Box sx={__SignupForm_box}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={nameChangeHandler}
        color="secondary"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={emailChangeHandler}
        color="secondary"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        value={password}
        onChange={passwordChangeHandler}
        color="secondary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={showVisibilityHandler}>
                {!showVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...{ type: showVisibility ? null : "password" }}
      />

      <SecondaryButton buttonText="Sign Up" />
    </Box>
  );
}

export default SignupForm;

// Styles

const __SignupForm_box = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
