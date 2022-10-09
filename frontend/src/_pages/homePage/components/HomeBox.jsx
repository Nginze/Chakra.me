import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const HomeBox = () => {
  return (
    <Box
      maxWidth={"310px"}
      width={"310px"}
      marginBottom={'1.4rem'}
      borderRadius={"4px"}
      bgcolor="white"
    >
      <Stack width={"100%"} marginBottom={'1rem'}>
        <Box width={"100%"} position={"relative"}>
          <img
            style={{
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              width: "100%",
              objectFit: "cover",
            }}
            height={"30px"}
            src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png"
          />
        </Box>
        <Stack
          paddingX={"8px"}
          marginBottom={"1.2rem"}
          direction={"row"}
          alignItems={"center"}
        >
          <img
            style={{
              objectFit: "contain",
              width: "77px",
              marginTop: "-20px",
              zIndex: "2",
            }}
            src="https://img.icons8.com/cotton/128/000000/robot-2.png"
          />
          <Typography>Homepage</Typography>
        </Stack>
        <Box paddingX={"8px"}>
          <Typography
            fontSize={"14px"}
            textAlign={"left"}
            sx={{ fontWeight: "400" }}
          >
            Your Personalized Chakra frontpage. Come here to check on your
            favourite spaces
          </Typography>
        </Box>
        <Stack marginY={"4px"}>
          <Button
            sx={{
              marginY: ".7rem",
              boxShadow: "none",
              borderRadius: "5rem",
              marginX: "8px",
            }}
            size="small"
            variant="contained"
          >
            Create Post
          </Button>
          <Button
            sx={{
              boxShadow: "none",
              borderRadius: "5rem",
              marginX: "8px",
            }}
            size="small"
            variant="outlined"
          >
            Create Space
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeBox;
