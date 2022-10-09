import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import React from "react";
import InteractionTray from "./InteractionTray";

const Post = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "640px",
        marginBottom: "1.5rem",
        borderRadius: "5px",
      }}
    >
      <Stack direction={"row"}>
        <Stack
          alignItems={"center"}
          bgcolor={"#f9f8fa"}
          padding={"8px 4px 8px 0"}
        >
          <IconButton>
            <KeyboardArrowUpOutlinedIcon />
          </IconButton>
          <Typography>7.9k</Typography>
          <IconButton>
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
        </Stack>
        <Stack
          alignItems={"flex-start"}
          width={"95%"}
          paddingY={"8px"}
          paddingX={"8px"}
        >
          <Stack direction={"row"} alignItems={"center"} marginBottom={"8px"}>
            <IconButton
              sx={{ width: "20px", height: "20px", marginRight: "0.5rem" }}
              size="small"
            >
              <Avatar sx={{ width: "20px", height: "20px" }} />
            </IconButton>
            <Typography marginRight={"8px"} fontSize={"12px"}>
              s/Naruto
            </Typography>
            <Typography
              fontSize={"12px"}
              color={"rgb(120, 124, 126)"}
              fontWeight={"400"}
            >
              Posted by u/ProgressForwards 5 hours ago
            </Typography>
          </Stack>
          <Stack alignItems={"flex-start"}>
            <Typography
              fontSize={"18px"}
              lineHeight={"22px"}
              marginBottom={"0.5rem"}
            >
            Lionel Messi is the GOAT
            </Typography>
            <Box maxWidth={"100%"}>
              <img
                width={"100%"}
                src="https://phantom-marca.unidadeditorial.es/99e1cccede87c1bea2835f316628e6eb/crop/101x0/1479x919/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/03/16648134351564.png"
              />
            </Box>
            <InteractionTray />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Post;
