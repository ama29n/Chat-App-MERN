import { Button } from "@mui/material";

export default function SecondaryButton({ buttonText, clickHandler }) {
  return (
    <>
      <Button variant="contained" color="secondary" onClick={clickHandler}>
        {buttonText}
      </Button>
    </>
  );
}
