import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#8338ec",
    "&:hover": {
        backgroundColor: "#7b2cbf"
    }
}));

export default function SecondaryButton ({ buttonText, clickHandler }) {
    return (
        <><MyButton variant="contained" onClick={clickHandler}>{buttonText}</MyButton></>
    );
}