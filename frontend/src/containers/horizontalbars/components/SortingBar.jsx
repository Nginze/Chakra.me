import { Avatar, Chip, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import RocketIcon from "@mui/icons-material/Rocket";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import React from "react";

const SortingBar = () => {
  return (
    <Box height={"58px"} bgcolor={"white"} marginBottom={"1rem"}>
      <Stack
        padding={"8px 8px"}
        height="100%"
        direction={"row"}
        alignItems={"center"}
      >
        <Chip
          label="Best"
          icon={<RocketIcon />}
          sx={{ marginRight: "1rem", backgroundColor: "white", opacity: "75%" }}
          clickable
        />
        <Chip
          label="Hot"
          icon={<LocalFireDepartmentIcon />}
          sx={{ marginRight: "1rem", backgroundColor: "white", opacity: "75%" }}
          clickable
        />
        <Chip
          label="New"
          icon={<VerifiedOutlinedIcon />}
          sx={{ marginRight: "1rem", backgroundColor: "white", opacity: "75%" }}
          clickable
        />
        <Chip
          label="Top"
          icon={<EqualizerOutlinedIcon />}
          sx={{ marginRight: "1rem", backgroundColor: "white", opacity: "75%" }}
          clickable
        />
      </Stack>
    </Box>
  );
};

export default SortingBar;
