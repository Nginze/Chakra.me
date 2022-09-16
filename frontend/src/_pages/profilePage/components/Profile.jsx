import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React from "react";
import ButtonGroup from "./ButtonGroup";

const Profile = ({ user }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      marginBottom={"1rem"}
    >
      <Stack direction={"row"} alignItems={"flex-start"} marginBottom={"1rem"}>
        <Avatar
          src={user?.imgUrl}
          sx={{ marginRight: "1rem", width: "7rem", height: "7rem" }}
        />
        <Stack alignItems={"flex-start"}>
          <Typography fontSize={"1.8rem"}>{user?.userName}</Typography>
          <Typography marginBottom={"0.7rem"} display={"flex"}>
            <Typography fontWeight={350} marginRight={"1rem"}>
              {user?.followers.length} followers
            </Typography>
            <Typography fontWeight={350}>{user?.following.length} following</Typography>
          </Typography>
          <ButtonGroup />
        </Stack>
        <Stack direction={"row"}>
          <IconButton>
            <ReplyOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Typography fontWeight={300}>{user?.bio}</Typography>
    </Box>
  );
};

export default Profile;
