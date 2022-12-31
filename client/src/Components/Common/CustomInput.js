import { Box } from "@mui/material";

function CustomInput() {
  return (
    <Box>
      <input
        placeholder="Search..."
        style={{
          outline: "none",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontSize: "1rem",
          border: "2px solid #3B8AD9",
          // border: "none",
          color: "black",
          width: "30ch",
        }}
      />
    </Box>
  );
}

export default CustomInput;
