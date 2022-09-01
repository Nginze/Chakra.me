import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const ChatInput = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px"
      }}
    >
      <TextField
       fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton aria-label="emojis">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <InsertPhotoOutlinedIcon/>
              </IconButton>
              <Button variant="text">Send</Button>
            </InputAdornment>
          ),
        }}
        id="outlined-basic"
        placeholder="Message"
        variant="outlined"
      />
    </Box>
  );
};

export default ChatInput;
