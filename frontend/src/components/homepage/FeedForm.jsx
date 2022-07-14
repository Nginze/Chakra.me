import React, { useContext, useState } from "react";
import { userContext } from "../../contexts/UserContext";
import "../../styles/FeedForm.css";
import PCreate from "./Pcreate";

const FeedForm = ({ increaseIndex }) => {
  const { data: user } = useContext(userContext);
  const [showPostModal, setShowPostModal] = useState(false);
  return (
    <>
      <div id="feed-form">
        <img src={user?.imgUrl} />
        <input
          onClick={() => {
            setShowPostModal(true);
            increaseIndex(true);
          }}
          placeholder="Create Post"
        />
        <button>Post</button>
      </div>

      {
        <PCreate
          show={showPostModal}
          toggle={setShowPostModal}
          post={true}
          reduceIndex={increaseIndex}
        />
      }
    </>
  );
};

export default FeedForm;
