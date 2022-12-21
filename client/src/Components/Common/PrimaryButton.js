import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#3a86ff",
}));

export default function PrimaryButton ({ buttonText, clickHandler }) {
    return (
        <><MyButton variant="contained" onClick={clickHandler}>{buttonText}</MyButton></>
    );
}