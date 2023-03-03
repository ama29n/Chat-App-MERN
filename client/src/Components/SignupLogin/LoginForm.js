import { useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions, authActions } from "../../Store/store";
import PopupMessage from "../Common/PopupMessage";

function LoginForm() {
  // URL and hooks
  const URL = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  // State for password view
  const [showVisibility, setShowVisibility] = useState(false);
  const showVisibilityHandler = () => {
    setShowVisibility((prev) => !prev);
  };
  // State to manage email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  // State for manage message
  const [message, setMessage] = useState("");
  // State to manage error message
  const [errorMessage, setErrorMessage] = useState(false);
  const openErrorMessage = () => {
    setErrorMessage(true);
  }
  const closeErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage(false);
  };
  // State to managage loading
  const [isLoading, setIsLoading] = useState(false);
  // Function to handle login
  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(URL + "/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(userActions.setUser(res.data));
        dispatch(authActions.login(res.data.token));
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage(error.response.data);
        openErrorMessage();
        setIsLoading(false);
      });
  };
  // Function to handle default user credentials
  const defualtJohnCredentialsHandler = () => {
    setEmail("johndoe@gmail.com");
    setPassword("johndoe12345678");
  };
  // const defualtJenniferCredentialsHandler = () => {
  //   setEmail("jenniferdoe@gmail.com");
  //   setPassword("jenniferdoe12345678");
  // };
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
      <LoadingButton
        onClick={loginHandler}
        variant="contained"
        loading={isLoading ? true : false}
        loadingIndicator="Wait..."
      >
        Login
      </LoadingButton>
      <Button variant="outlined" onClick={defualtJohnCredentialsHandler}>Get User Credential</Button>      
      <PopupMessage open={errorMessage} handleClose={closeErrorMessage} severity="error" message={message} />
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
