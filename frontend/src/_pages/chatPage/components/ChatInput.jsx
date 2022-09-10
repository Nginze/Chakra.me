import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { socketContext } from "../contexts/SocketContext";

const ChatInput = ({ user, conversationId, openChat, setChat }) => {
  const [message, setMessage] = useState();
  const queryClient = useQueryClient();
  const { socket } = useContext(socketContext);
  const sendMessage = useMutation(
    () => {
      return axios({
        method: "post",
        url: "http://localhost:5000/message",
        withCredentials: true,
        data: {
          conversationId: conversationId,
          senderId: user._id,
          message: message,
        },
      });
    },
    {
      onMutate: async variables => {
        await queryClient.cancelQueries(["messages", conversationId]);
        // const previousMessages = queryClient.getQueryData([
        //   "messages",
        //   conversationId,
        // ]);
        setChat([
          ...openChat,
          {
            conversationId: conversationId,
            sender: user,
            message: message,
            createdAt: Date.now(),
          },
        ]);
        queryClient.setQueryData(["messages", conversationId], old => [
          ...old,

          {
            conversationId: conversationId,
            sender: user,
            message: message,
            createdAt: Date.now(),
          },
        ]);
        socket.emit(
          "send_message",

          {
            conversationId: conversationId,
            sender: user,
            message: message,
            createdAt: Date.now(),
          }
        );
      },
    }
  );
  return (
    <Box
      sx={{
        width: "100%",
        padding: "30px",
      }}
    >
      <TextField
        onChange={e => setMessage(e.target.value)}
        value={message}
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
                <InsertPhotoOutlinedIcon />
              </IconButton>
              <Button onClick={() => sendMessage.mutate()} variant="text">
                Send
              </Button>
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
