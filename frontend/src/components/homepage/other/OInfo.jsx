import axios from "axios";
import { React, useState } from "react";
import ContentLoader from "react-content-loader";
import ContentShimmer, { ProfileShimmer } from "react-content-shimmer";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getUser } from "../../../helpers";
import FModal from "../profile/FModal";

const OInfo = ({ user }) => {
  const navigate = useNavigate();
  const { data: follower } = useQuery("user", getUser);
  const [showFollowers, setFollowers] = useState(false);
  const [showFollowing, setFollowing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showUnfollow, setUnfollow] = useState(false);
  const queryClient = useQueryClient();
  const createNotfication = message => {
    axios({
      method: "post",
      url: `http://localhost:5000/notification`,
      withCredentials: true,
      data: {
        userId: user._id,
        causerId: follower._id,
        message: message,
      },
    });
  };
  const checkIsFollowing = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:5000/user/follow/${user?._id}/check/?user=${follower?._id}`,
      withCredentials: true,
    });
    return res.data;
  };
  const createConversation = async () => {
    const { data: conversation } = await axios({
      method: "get",
      url: `http://localhost:5000/conversation/find/${user._id}/${follower._id}`,
      withCredentials: true,
      data: {
        userId: user._id,
        followerId: follower._id,
      },
    });
    if (conversation) {
      navigate(`/direct?cid=${conversation._id}&rcv=${user._id}`);
    } else {
      const {data: newConversation} = await axios({
        method: "post",
        url: "http://localhost:5000/conversation",
        withCredentials: true,
        data: {
          senderId: follower._id,
          receiverId: user._id,
        },
      });
      console.log(newConversation);
      navigate(`/direct?cid=${newConversation._id}&rcv=${user._id}`);
    }
  };
  const submitFollow = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: "http://localhost:5000/user/follow",
      withCredentials: true,
      data: {
        userId: user._id,
        followerId: follower._id,
      },
    });

    queryClient.invalidateQueries("other");
    queryClient.invalidateQueries(["following-state", user?._id]);
    queryClient.invalidateQueries("user");
    createNotfication("followed you");
    setLoading(false);
  };
  const { data: followingState } = useQuery(
    ["following-state", user?._id],
    checkIsFollowing,
    {
      enabled: !!user && !!follower,
    }
  );

  return user && followingState ? (
    <div id="p-info">
      <div className="p-meta-container">
        <img id="p-img" src={user.imgUrl} />
        <div className="p-meta">
          <h2 className="p-meta-name">
            {user.userName}
            {!followingState?.isFollowing ? (
              <button onClick={submitFollow} className="post-btn follow-btn">
                {!isLoading ? (
                  <span>Follow</span>
                ) : (
                  <ClipLoader color={"white"} loading={isLoading} size={10} />
                )}
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  marginLeft: "1rem",
                  position: "relative",
                }}
              >
                <button
                  onClick={createConversation}
                  style={{
                    marginRight: "1rem",
                    padding: "0.3rem",
                    cursor: "pointer",
                  }}
                >
                  Message
                </button>
                <button
                  onClick={() => setUnfollow(!showUnfollow)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "3rem",
                    cursor: "pointer",
                  }}
                >
                  <i
                    style={{ margin: 0, fontSize: "1rem" }}
                    class="fa-solid fa-user-check"
                  ></i>
                </button>
                {showUnfollow && (
                  <div className="unfollow animate__animated animate__zoomIn animate__faster">
                    <button>Unfollow</button>
                  </div>
                )}
              </div>
            )}
          </h2>

          <div className="p-meta-stats">
            <span> {user.posts.length} posts </span>
            <span onClick={() => setFollowers(true)}>
              {" "}
              {user.followers.length} followers{" "}
            </span>
            <span onClick={() => setFollowing(true)}>
              {" "}
              {user.following.length} following{" "}
            </span>
          </div>
          <p className="p-bio">{user.bio}</p>
        </div>
      </div>

      <FModal
        show={showFollowers}
        data={user}
        toggle={setFollowers}
        type="followers"
      />
      <FModal
        show={showFollowing}
        data={user}
        toggle={setFollowing}
        type="following"
      />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 20px",
      }}
    >
      <ContentShimmer
        style={{ width: "150px", height: "150px", marginRight: '2rem' }}
        size={{ height: 150, width: 150 }}
        rounded="100%"
      />
      <div>
        <ContentShimmer
          style={{ height: 20, width: "300px" , marginBottom: '1rem'}}
          size={{ height: 50 }}
        />
         <ContentShimmer
          style={{ height: 20, width: "200px" , marginBottom: '1rem'}}
          size={{ height: 50 }}
        />
          <ContentShimmer
          style={{ height: 20, width: "250px"  }}
          size={{ height: 50 }}
        />
      </div>
    </div>
  );
};

export default OInfo;
