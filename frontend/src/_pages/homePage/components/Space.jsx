import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

const Space = ({ imgUrl, spacename, trendingState }) => {
  return (
    <Box width={"100%"}>
      <Stack
        width={"100%"}
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        paddingY={"6px"}
      >
        <Stack
          direction={"row"}
          height={"38px"}
          alignItems={"center"}
          marginX={"8px"}
        >
          <Typography>1</Typography>
          {trendingState ? (
            <KeyboardArrowUpIcon htmlColor="rgb(70, 209, 96)" />
          ) : (
            <KeyboardArrowDownIcon htmlColor="#ec1e3a" />
          )}
          <Avatar sx={{ marginX: "8px", width: "32px", height: "32px" }} />
          <Typography fontSize={"14px"}>Naruto</Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            marginRight: "1rem",
            boxShadow: "none",
            borderRadius: "5rem",
            fontSize: "12px",
            justifySelf: "flex-end",
          }}
          size="small"
        >
          Join
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
};

export default Space;
