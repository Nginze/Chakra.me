import axios from "axios";
import { React, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useInfiniteQuery } from "react-query";
import Feed from "../components/homepage/Feed";
import R_Sidebar from "../components/homepage/R_Sidebar";
import Sidebar from "../components/homepage/Sidebar";
import StoryModal from "../components/homepage/StoryModal";
import "../styles/Home.css";

const Home = () => {
  // localStorage.removeItem('isAuth')
  const [type, setType] = useState("recent");
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const getPosts = async (type, pageParam) => {
    const posts = await axios({
      method: "get",
      url: `http://localhost:5000/post/?sort=${type}&page=${pageParam}`,
      withCredentials: true,
    });
    return posts;
  };

  const { data, isLoading, isError, hasNextPage, refetch, fetchNextPage } =
    useInfiniteQuery(
      ["posts", type],
      ({ pageParam = 1 }) => {
        return getPosts(type, pageParam);
      },
      {
        keepPreviousData: true,
        getNextPageParam: lastPage => {
          if (lastPage.data.posts.length >= 10) return lastPage?.data.cursor;
          return undefined;
        },
      }
    );
  console.log(stories[0]);
  return (
    <>
      <Toaster />
      <StoryModal show={showStory} stories={stories} toggle={setShowStory} />
      <main className="home">
        <Sidebar />
        <Feed
          toggle={setShowStory}
          setStories={setStories}
          posts={data?.pages}
          isLoading={isLoading}
          refetch={refetch}
          setType={setType}
          type={type}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
        <R_Sidebar />
      </main>
    </>
  );
};

export default Home;
