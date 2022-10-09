import { Box } from "@mui/system";
import React from "react";
import Post from "../../../_pages/homePage/components/Post";
import PostBar from "../../horizontalbars/components/PostBar";
import SortingBar from "../../horizontalbars/components/SortingBar";

const Feed = ({ posts }) => {
  return (
    <Box width={"100%"}>
      <PostBar />
      <SortingBar />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default Feed;
