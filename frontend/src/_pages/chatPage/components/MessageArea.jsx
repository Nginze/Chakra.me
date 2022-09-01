import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const MessageArea = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            padding: "0 20px",
            borderBottom: "1px solid #e0e0e0",
            height: "10%",
          }}
        >
          <Avatar
            sx={{ width: "24px", height: "24px", marginRight: '10px' }}
            alt={"John"}
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
            }
          />
          <Box>
            <ListItemText primary={"John"} secondary={"Active Now"} />
          </Box>
        </Box>
        {/* <IconButton sx={{width: '24px', height: '24px'}}>
          <InfoOutlinedIcon />
        </IconButton> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "72%",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
          isMyself={true}
        />
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
          isMyself={false}
        />
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
          isMyself={true}
        />
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
        />
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
        />
        <Message
          text={"Boy what the hell boy why are you a jon boy"}
          avatar={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          }
        />
      </Box>
      <Box>
        <ChatInput />
      </Box>
    </>
  );
};

export default MessageArea;
