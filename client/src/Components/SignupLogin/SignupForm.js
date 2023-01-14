import { useState } from "react";
import { TextField, Box, IconButton, InputAdornment, Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function SignupForm({ successfullRegister }) {
  const URL = process.env.REACT_APP_URL;
  const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const userImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const [showVisibility, setShowVisibility] = useState(false);
  const showVisibilityHandler = () => {
    setShowVisibility((prev) => !prev);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(userImage);

  const [isLoading, setIsLoading] = useState(false);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const profilePhotoChangeHandler = async (e) => {
    const file = e.target.files["0"];
    if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Chat-App-MERN");
        formData.append("cloud_name", "dbpu407gg");
        const imageData = await axios.post(CLOUDINARY_URL, formData);
        const image = imageData.data;
        setProfilePhoto(image.url);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    axios.post(URL + "/user/register", {
      name: name,
      email: email,
      password: password,
      profilePhoto: profilePhoto
    })
    .then(res => {
      setName("");
      setEmail("");
      setPassword("");
      setProfilePhoto(userImage);
      successfullRegister();
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  }

  return (
    <Box sx={__SignupForm_box}>
      <TextField fullWidth label="Name" value={name} onChange={nameChangeHandler} color="primary" variant="outlined" />
      <TextField fullWidth label="Email" value={email} onChange={emailChangeHandler} color="primary" variant="outlined" type="email" />
      <TextField fullWidth label="Password" value={password} onChange={passwordChangeHandler} color="primary"
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

      <Box sx={__SignupForm_upload_image_box}>
        <Box sx={__SignupForm_image_box}><img src={profilePhoto} alt="user" style={__SignupForm_image} /></Box>
        <Button fullWidth color="info" variant="outlined" component="label">
          Profile Photo
          <input color="primary" accept="image/*" type="file" style={{ display: "none" }} onChange={profilePhotoChangeHandler} />
        </Button>
      </Box>
      <LoadingButton variant="contained" loading={isLoading ? true : false} loadingIndicator="Wait..." onClick={signUpHandler}>Sign Up</LoadingButton>
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

const __SignupForm_upload_image_box = {
  width: "100%",
  display: "flex",
  gap: "0.5rem",
};

const __SignupForm_image_box = {
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
};

const __SignupForm_image = {
  width: "100%",
  height: "auto",
  borderRadius: "50%",
};