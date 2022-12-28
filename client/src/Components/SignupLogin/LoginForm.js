import { useState } from "react";
import { TextField, Box, IconButton, InputAdornment, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PrimaryButton from "../Common/PrimaryButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showVisibility, setShowVisibility] = useState(false);
  const showVisibilityHandler = () => {
    setShowVisibility((prev) => !prev);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    axios.post("/user/login", {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res.data);
      navigate("/chat");
    })
    .catch(error => {
      alert(error.response.data)
    });
  };
  const defualtUserCredentialsHandler = (e) => {
    e.preventDefault();
    setEmail("johndoe@johndoe.com");
    setPassword("johndoe");
  };
  return (
    <Box sx={__LoginForm_box}>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={emailChangeHandler}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        value={password}
        onChange={passwordChangeHandler}
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
      <PrimaryButton clickHandler={loginHandler} buttonText="Login" />
      <Button variant="outlined" onClick={defualtUserCredentialsHandler}>Get User Credential</Button>
    </Box>
  );
}

export default LoginForm;

// Styles

const __LoginForm_box = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
