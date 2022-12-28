import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ColorToggleButton({ action, changeAction }) {
  return (
    <ToggleButtonGroup
      value={action}
      exclusive
      onChange={changeAction}
      aria-label="Platform"
    >
      <ToggleButton value="login" color="primary">
        Login
      </ToggleButton>
      <ToggleButton value="signup" color="primary">
        Sign Up
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
