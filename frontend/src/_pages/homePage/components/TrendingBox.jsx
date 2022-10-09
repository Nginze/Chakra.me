import { Button, Chip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Space from "./Space";

const TrendingBox = () => {
  return (
    <Box
      maxWidth={"310px"}
      marginBottom={"1.3rem"}
      width={"310px"}
      borderRadius={"4px"}
      bgcolor="white"
    >
      <Stack width={"100%"}>
        <Box maxWidth={"100%"} position="relative" borderRadius={"4px"}>
          <Box
            sx={{
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              position: "absolute",
              width: "100%",
              height: "80px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              opacity: "40%",
            }}
          ></Box>
          <img
            style={{
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              minWidth: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            height={"80px"}
            src="https://styles.redditmedia.com/t5_2qh13/styles/bannerBackgroundImage_5q0f5lsk6pu01.png"
          />
          <Typography
            position={"absolute"}
            top={"50px"}
            left={"15px"}
            color="white"
          >
            Top Spaces
          </Typography>
        </Box>
        <Stack paddingX={"8px"}>
          <Space />
          <Space />
          <Space />
          <Space />
        </Stack>
        <Button
          variant="contained"
          sx={{
            marginTop: "1.3rem",
            boxShadow: "none",
            borderRadius: "5rem",
            marginX: "8px",
          }}
          size="small"
        >
          View All
        </Button>
        <Stack
          direction={"row"}
          marginTop={"14px"}
          padding={'8px 16px'}
          width={"100%"}
          alignItems={"center"}
        >
          <Chip
            sx={{
              color: "#1a82d7",
              backgroundColor: "#f6f6f9",
              marginRight: "1rem",
            }}
            label={"sports"}
          />
          <Chip
            sx={{
              color: "#1a82d7",
              backgroundColor: "#f6f6f9",
              marginRight: "1rem",
            }}
            label={"anime"}
          />
          <Chip
            sx={{
              color: "#1a82d7",
              backgroundColor: "#f6f6f9",
              marginRight: "1rem",
            }}
            label={"football"}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TrendingBox;
