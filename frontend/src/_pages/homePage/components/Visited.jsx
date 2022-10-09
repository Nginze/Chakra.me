import { Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const Visited = () => {
  return (
    <Box marginY={"4px"}>
      <Stack direction={"row"}>
        <Box width={"68px"} height={"45px"} marginRight={"0.7rem"}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
            src="https://i0.wp.com/static1.srcdn.com/wordpress/wp-content/uploads/2022/07/Naruto-Shippuden.jpg?resize=780,470"
          />
        </Box>
        <Stack alignItems={"flex-start"} marginBottom={"5px"}>
          <Typography textAlign={"left"} fontSize={"14px"}>
            Whats beyond backend development?
          </Typography>
          <Typography fontSize={"12px"} sx={{ opacity: "50%" }}>
            1.2k chakra 124 comments Apr 7
          </Typography>
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
};

export default Visited;
