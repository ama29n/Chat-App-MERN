import { Box } from "@mui/material";

function CustomInput({ value, changeHandler }) {
  return (
    <Box>
      <input
        value={value}
        onChange={changeHandler}
        style={{
          outline: "none",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontSize: "1rem",
          border: "2px solid #3B8AD9",
          color: "black",
          width: "30ch",
        }}
      />
    </Box>
  );
}

export default CustomInput;
