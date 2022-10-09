import { Box, Stack } from "@mui/system";
import React from "react";
import Feed from "../../containers/feed/components/Feed";
import HomeBox from "./components/HomeBox";
import Post from "./components/Post";
import SideBar from "./components/SideBar";
import TrendingBox from "./components/TrendingBox";
import VisitedBox from "./components/VisitedBox";

const Index = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      width={"80%"}
      height={"100vh"}
      marginTop={"5rem"}
      marginX={"auto"}
    >
      <Stack maxWidth={"640px"} marginRight={'40px'}>
        <Feed />
      </Stack>
      <Stack maxWidth={"310px"}>
        <SideBar />
      </Stack>
    </Stack>
  );
};

export default Index;
