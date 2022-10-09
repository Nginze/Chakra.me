import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Visited from "./Visited";

const VisitedBox = () => {
  return (
    <Box
      sx={{
        top: 0,
        backgroundColor: "white",
        maxWidth: "310px",
        marginBottom: "1rem",
        width: "310px",
        borderRadius: "4px",
        padding: "8px 8px",
      }}
    >
      <Stack alignItems={"flex-start"}>
        <Typography fontSize={"12px"} color={"#5d5d5c"}>
          RECENT POSTS
        </Typography>
        <Stack marginY={"14px"} alignItems={"flex-start"}>
          <Visited />
          <Visited />
          <Visited />
          <Visited />
          <Visited />
        </Stack>
      </Stack>
    </Box>
  );
};

export default VisitedBox;
