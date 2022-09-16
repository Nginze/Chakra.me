import { Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import React from "react";

const SideBar = () => {
  return (
    <Stack>
      <Stack marginBottom={"1.3rem"}>
        <Typography alignSelf={"flex-start"} marginBottom={"0.8rem"}>
          Milestones
        </Typography>
        <Divider sx={{ marginBottom: "1rem", width: "100%" }} />
        <Stack alignSelf={"flex-start"}>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <WorkOutlineOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Active in 2 spaces
          </Typography>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <CakeOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Joined on July 2022
          </Typography>
        </Stack>
      </Stack>

      <Stack marginBottom={"1.3rem"}>
        <Typography alignSelf={"flex-start"} marginBottom={"0.8rem"}>
         Spaces 
        </Typography>
        <Divider sx={{ marginBottom: "1rem", width: "100%" }} />
        <Stack alignSelf={"flex-start"}>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <WorkOutlineOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Active in 2 spaces
          </Typography>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <CakeOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Joined on July 2022
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography alignSelf={"flex-start"} marginBottom={"0.8rem"}>
         Knows About 
        </Typography>
        <Divider sx={{ marginBottom: "1rem", width: "100%" }} />
        <Stack alignSelf={"flex-start"}>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <WorkOutlineOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Active in 2 spaces
          </Typography>
          <Typography
            fontWeight={300}
            display={"flex"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <CakeOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Joined on July 2022
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SideBar;
