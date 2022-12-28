import ToggleButton from "../Components/SignupLogin/ToggleButton";
import { useState } from "react";
import { Box } from "@mui/material";
import SignupForm from "../Components/SignupLogin/SignupForm";
import LoginForm from "../Components/SignupLogin/LoginForm";

function StartPage() {
  const [action, setAction] = useState("login");
  const changeAction = (e) => {
    if(action === e.target.value)
      return;
    if (action === "login") {
      setAction("signup");
    } else {
      setAction("login");
    }
  };
  const successfullRegister = () => {
    setAction("login");
  };
  return (
    <Box sx={__StartPage_outer_box}>
      <Box sx={__StartPage_inner_box}>
        <ToggleButton action={action} changeAction={changeAction} />
        {action === "login" ? <LoginForm /> : <SignupForm successfullRegister={successfullRegister} />}
      </Box>
    </Box>
  );
}

export default StartPage;

// Styles

const __StartPage_outer_box = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const __StartPage_inner_box = {
  width: "400px",
  borderRadius: "5px",
  boxShadow: "3px 3px 20px #cccccc",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};
