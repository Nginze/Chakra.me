import { Stack } from "@mui/system";
import React from "react";
import HomeBox from "./HomeBox";
import TrendingBox from "./TrendingBox";
import VisitedBox from "./VisitedBox";

const SideBar = () => {
  return (
    <Stack position={"sticky"} top={0}>
      <TrendingBox />
      <HomeBox />
      <VisitedBox />
    </Stack>
  );
};

export default SideBar;
