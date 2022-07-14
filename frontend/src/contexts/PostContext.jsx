import axios from "axios";
import { React, createContext, useState, useEffect } from "react";

export const postContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  // useEffect (() => {
  //   getPosts()
  // }, [posts])

  return (
    // <postContext.Provider value = {{posts, setPosts, getPosts}}>
    //         {children}
    // </postContext.Provider>
    <></>
  );
};

export default PostProvider;
