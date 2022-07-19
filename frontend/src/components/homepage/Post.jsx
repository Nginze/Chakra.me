import "animate.css";
import axios from "axios";
import moment from "moment";
import { React, useContext, useState } from "react";
import toast from "react-hot-toast";
import Tooltip from "react-power-tooltip";
import { userContext } from "../../contexts/UserContext";
import "../../styles/Post.css";
import CommentLoader from "../comment-section/CommentLoader";
import CommentSection from "../comment-section/CommentSection";
import ShareModal from "./ShareModal";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post?.upvotes?.length);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: user } = useContext(userContext);
  const [liked, setLiked] = useState(
    user ? post?.upvotes?.includes(user._id) : false
  );
  const [comments, setComments] = useState(null);
  const [showSaveTooltip, setSaveTooltip] = useState(false);
  const [showShareModal, setShareModal] = useState(false);
  const getComments = () => {
    if (!comments) {
      setLoading(true);
    }

    axios({
      method: "get",
      url: `http://localhost:5000/comment/${post._id}`,
      withCredentials: true,
    })
      .then(response => {
        setComments(response.data);
        setLoading(false);
        console.log("getcomments called");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const savePost = async () => {
    const res = await axios({
      method: "put",
      url: `http://localhost:5000/user/${user._id}/save`,
      withCredentials: true,
      data: {
        postId: post._id,
      },
    });
    toast.success("Saved Post")
    console.log(res)
  };
  const likePost = () => {
    setLikes(likes + 1);
    setLiked(true);
    axios({
      method: "post",
      url: `http://localhost:5000/post/like/${post._id}`,
      withCredentials: true,
      data: {
        postId: post._id,
        userId: user._id,
      },
    }).then(createNotfication(`liked your post`));
  };

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

  return (
    post && (
      <>
        <div className="post-container">
          <div className="post-container-inner">
            <div style={{ cursor: "pointer" }} className="post-info">
              <img className="post-profile-img" src={post.userImg} />
              <div className="post-profile-info-container">
                <div className="post-profile-info">
                  <span className="profile-author">{post.userName}</span>
                  <span className="profile-time">
                    {moment(post.timeStamp)
                      .fromNow()
                      .replace(" days", "d")
                      .replace(" minutes", "m")}
                  </span>
                </div>
                <div
                  onClick={() => setSaveTooltip(!showSaveTooltip)}
                  style={{ position: "relative" }}
                >
                  <Tooltip
                    show={showSaveTooltip}
                    arrowAlign="end"
                    position="right center"
                    lineSeparated
                    textBoxWidth="80px"
                    fontWeight="400"
                    moveRight="10px"
                    moveUp="10px"
                  >
                    <div>
                      <div
                        onClick={savePost}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{ marginRight: "0.2rem" }}
                          class="iconify"
                          data-icon="bytesize:bookmark"
                          data-width="15"
                        ></span>
                        <span style={{ fontSize: "12px", display: "inline" }}>
                          Save
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
              </div>
              {/* <Profile_Card userId={post.userId}/> */}
            </div>
            <div className="post-content-text">{post.message}</div>
            {post.imgUrl && (
              <img className="post-content-img" src={post.imgUrl} />
            )}
            <div className="post-engagement">
              <div className="interactions">
                <div className="voting">
                  {!liked ? (
                    <button
                      className="upvote-btn"
                      style={{ width: "68.3px" }}
                      onClick={likePost}
                    >
                      <span
                        class="iconify liked"
                        data-icon="mdi:arrow-up-bold-outline"
                      ></span>
                      <span
                        className={
                          !liked
                            ? "voting-stats"
                            : "voting-stats liked animate__animated  animate__flipInY"
                        }
                      >
                        {likes}
                      </span>
                    </button>
                  ) : (
                    <button className="upvote-btn" style={{ width: "68.3px" }}>
                      <span
                        id="like-fill"
                        class="iconify animate__animated animate__jackInTheBox animate__faster"
                        data-icon="mdi:arrow-up-bold"
                      ></span>
                      <span
                        className={
                          !liked
                            ? "voting-stats"
                            : "voting-stats liked animate__animated  animate__flipInY"
                        }
                      >
                        {likes}
                      </span>
                    </button>
                  )}
                  <div className="right-border"></div>

                  <button className="downvote-btn" style={{ width: "40%" }}>
                    <span
                      class="iconify"
                      data-icon="mdi:arrow-down-bold-outline"
                    ></span>
                  </button>
                </div>
                <div onClick={() => setShareModal(true)} className="commenting">
                  <span
                    className="iconify icons"
                    data-icon="bx:share-alt"
                  ></span>
                  <span className="sharing-stats"> 80 </span>
                </div>
                <div className="sharing">
                  <div
                    onClick={() => {
                      setShowComments(!showComments);
                      getComments();
                    }}
                  >
                    <span
                      className="iconify icons"
                      data-icon="ic:outline-mode-comment"
                    ></span>
                  </div>
                  <span className="commenting-stats"> {comments?.length} </span>
                </div>
              </div>
            </div>
          </div>
          <ShareModal show={false} toggle={setShareModal} />
          {showComments && comments && (
            <CommentSection
              toggle={getComments}
              post={post}
              comments={comments}
            />
          )}
          {loading && <CommentLoader />}
        </div>
      </>
    )
  );
};

export default Post;
