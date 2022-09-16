import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ButtonGroup = () => {
  return (
    <Stack direction={"row"}>
      <Button
        sx={{ marginRight: "1rem", boxShadow: "none", borderRadius: "5rem" }}
        variant="contained"
        size="small"
      >
        Follow
      </Button>

      <Button
        sx={{
          marginRight: "1rem",
          boxShadow: "none",
          borderRadius: "5rem",
          backgroundColor: "#f7f6f9",
        }}
        variant="outlined"
        size="small"
      >
        Message
      </Button>
    </Stack>
  );
};

export default ButtonGroup;
