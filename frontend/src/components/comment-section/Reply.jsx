import axios from "axios";
import moment from "moment";
import { React, useState } from "react";
import ReplyForm from "./ReplyForm";

const Reply = ({ toggle, parent, user, reply }) => {
  const [likes, setLikes] = useState(reply.upvotes.length);
  const [liked, setLiked] = useState(
    user ? reply.upvotes.includes(user._id) : false
  );
  const [showForm, setShowForm] = useState(false);

  const likeComment = () => {
    axios({
      method: "post",
      url: `http://localhost:5000/comment/like/c/${reply._id}`,
      withCredentials: true,
      data: {
        userId: user._id,
      },
    });
  };

  return (
    <div
      id="reply"
      className="animate__animated animate__fadeIn animate__faster"
    >
      <div className="post-info">
        <img className="post-profile-img" src={reply.userImg} />
        <div className="post-profile-info">
          <div style={{ fontSize: "0.8rem", marginBottom: "0.2rem" }}>
            <span className="profile-author">{reply.userName}</span>
            {reply.replier ? (
              <span>
                <i
                  style={{ fontSize: "0.6rem" }}
                  className="fa-solid fa-caret-right"
                ></i>{" "}
                {reply?.replier}
              </span>
            ) : null}
            <span className="seperator">·</span>
            <span className="profile-time">
              {moment(reply.timeStamp).fromNow(true)}
            </span>
          </div>
          <div className="comment-content">
            <p className="comment-text">{reply.message}</p>
            <div className="comment-engagement">
              {!liked ? (
                <button
                  onClick={() => {
                    setLiked(true);
                    setLikes(likes + 1);
                    likeComment();
                  }}
                >
                  <span
                    class="iconify liked"
                    data-icon="mdi:arrow-up-bold-outline"
                  ></span>
                </button>
              ) : (
                <span
                  id="like-fill"
                  class="iconify animate__animated animate__jackInTheBox animate__faster"
                  data-icon="mdi:arrow-up-bold"
                ></span>
              )}
              <button style={{ display: "flex", alignItems: "center" }}>
                <span
                  className={
                    !liked
                      ? "comment-stats"
                      : "comment-stats liked animate__animated  animate__flipInY"
                  }
                ></span>
                <span
                  className={!liked ? "" : "liked"}
                  style={{ fontSize: "0.8rem" }}
                >
                  {likes}
                </span>
              </button>
              <button
                style={{ fontSize: "0.8rem" }}
                onClick={() => setShowForm(!showForm)}
                id="reply"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <ReplyForm
          disableForm={setShowForm}
          toggle={toggle}
          reply={reply}
          parent={parent}
        />
      )}
    </div>
  );
};

export default Reply;
