import axios from "axios";
import { React, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "../../styles/CommentForm.css";

const CommentForm = ({ user, post, toggle }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createNotfication = message => {
    axios({
      method: "post",
      url: `http://localhost:5000/notification`,
      withCredentials: true,
      data: {
        postId: post._id,
        userId: post.userId,
        causerId: user._id,
        message: message,
      },
    });
  };
  const createComment = () => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://localhost:5000/comment/",
      withCredentials: true,
      data: {
        message: message,
        userId: user._id,
        userImg: user.imgUrl,
        userName: user.userName,
        postId: post._id,
      },
    }).then(response => {
      toggle();
      setLoading(false);
      createNotfication("commented on your post");
    });
  };
  return (
    <div id="comment-form">
      <img src={user.imgUrl} />
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={createComment}>
        {!loading ? (
          <span>Add Comment</span>
        ) : (
          <ClipLoader color={"white"} loading={loading} size={10} />
        )}
      </button>
    </div>
  );
};

export default CommentForm;
