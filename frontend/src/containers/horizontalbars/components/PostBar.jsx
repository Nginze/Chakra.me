import { Avatar, IconButton, Input, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import React from "react";

const PostBar = () => {
  return (
    <Box height={"58px"} bgcolor={"white"} marginBottom={"1rem"}>
      <Stack padding={"8px 8px"} direction={"row"} alignItems={"center"}>
        <Avatar />
        <TextField
          placeholder="Create Post"
          variant="outlined"
          fullWidth
          size="small"
          sx={{marginX: '8px'}}
        />
        <IconButton>
          <ImageOutlinedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default PostBar;
