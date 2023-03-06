import ToggleButton from "../Components/SignupLogin/ToggleButton";
import { useState } from "react";
import { Box } from "@mui/material";
import SignupForm from "../Components/SignupLogin/SignupForm";
import LoginForm from "../Components/SignupLogin/LoginForm";
import background from "../Resources/bg-2.jpg";

function StartPage() {
  // State to manage toggle button
  const [action, setAction] = useState("login");
  const changeAction = (e) => {
    if (action === e.target.value) return;
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
      <Box sx={__StartPage_background_box}></Box>
      <Box sx={__StartPage_heading_box}>Hi You</Box>
      <Box sx={__StartPage_form_box}>
        <ToggleButton action={action} changeAction={changeAction} />
        {action === "login" ? (
          <LoginForm />
        ) : (
          <SignupForm successfullRegister={successfullRegister} />
        )}
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
  flexDirection: "column",
  "@media(max-width: 400px)": {
    justifyContent: "sapce-evenly"
  }
};

const __StartPage_background_box = {
  background: `url(${background})`,
  filter: "blur(4px)",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  position: "absolute",
  zIndex: "-1",
  "@media(max-width: 800px)": {
    backgroundSize: "contain"
  }
};

const __StartPage_heading_box = {
  width: "360px",
  // borderRadius: "5px",
  // boxShadow: "3px 3px 20px #858585",
  backgroundColor: "White",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // marginBottom: "1rem",
  fontSize: "3rem",
  color: "#1976D2",
  fontWeight: "500",
  fontFamily: "'Oleo Script Swash Caps', cursive",
  "@media(max-width: 400px)": {
    width: "calc(100% - 30px)",
    margin: "0px auto",
    boxShadow: "none",
    borderRadius: "5px 5px 0px 0px",
    border: "1px solid #d6d6d7"
  },
  boxShadow: "none",
  borderRadius: "5px 5px 0px 0px",
  border: "1px solid #d6d6d7"
};

const __StartPage_form_box = {
  width: "360px",
  // borderRadius: "5px",
  // boxShadow: "3px 3px 20px #858585",
  backgroundColor: "White",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  "@media(max-width: 400px)": {
    width: "calc(100% - 30px)",
    margin: "0px auto",
    boxShadow: "none",
    borderRadius: "0px 0px 5px 5px",
    border: "1px solid #d6d6d7",
    borderTop: "none"
  },
  boxShadow: "none",
  borderRadius: "0px 0px 5px 5px",
  border: "1px solid #d6d6d7",
  borderTop: "none"
};
