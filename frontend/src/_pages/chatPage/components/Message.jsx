import { Box, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import React, { useState } from "react";

const Message = ({ text, avatar, username, isMyself }) => {
  const [showOptions, setOptions] = useState(false);
  return (
    <Box
      onMouseOver={() => setOptions(true)}
      onMouseOut={() => setOptions(false)}
      sx={{
        display: "flex",
        flexDirection: `${isMyself ? "row-reverse" : "row"}`,
        justifyContent: `${isMyself ? "" : "flex-start"}`,
        alignItems: "flex-end",
        marginBottom: "0.8rem",
        width: "100%",
      }}
    >
      {!isMyself && (
        <Avatar
          sx={{ width: "24px", height: "24px" }}
          alt={username}
          src={avatar}
        />
      )}
      <Box
        sx={{
          backgroundColor: `${isMyself ? "#eeeeef" : "#fefeff"}`,
          padding: "16px",
          minHeight: "44px",
          borderRadius: "22px",
          fontSize: "0.9rem",
          maxWidth: "236px",
          textAlign: "left",
          borderColor: "#dee0e1!important",
          borderStyle: "solid",
          borderWidth: "0.4px",
          boxShadow: "0 1px 1pxrgb(0 0 0/4%)",
          marginLeft: "0.5rem",
          marginRight: "0.9rem",
        }}
      >
        {text}
      </Box>
      {showOptions && (
        <Box
          sx={{
            alignSelf: "center",
            display: "flex",
            flexDirection: `${!isMyself ? "row-reverse" : "row"}`
          }}
        >
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
          <IconButton>
            <KeyboardReturnIcon />
          </IconButton>
          <IconButton>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Message;
