import { Button } from "@mui/material";

export default function PrimaryButton({ buttonText, clickHandler }) {
  return (
    <>
      <Button variant="contained" onClick={clickHandler}>
        {buttonText}
      </Button>
    </>
  );
}
