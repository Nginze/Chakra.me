import axios from "axios";
import moment from "moment";
import { React, useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from "../../contexts/UserContext";
import "../../styles/A_Profile.css";

const A_Profile = ({ data }) => {
  const timeMap = {
    minutes: "m",
    days: "d",
  };
  const { data: user } = useContext(userContext);
  const [fState, setFState] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const checkIsFollowing = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:5000/user/follow/${data?.causerId?._id}/check/?user=${user?._id}`,
      withCredentials: true,
    });
    setFState(res?.data.isFollowing);
    return res.data;
  };
  const submitFollow = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: "http://localhost:5000/user/follow",
      withCredentials: true,
      data: {
        userId: data?._id,
        followerId: user?._id,
      },
    });
    queryClient.invalidateQueries(["following-state", data?._id]);
    setLoading(false);
  };

  const { data: followingState } = useQuery(
    ["following-state", data._id],
    checkIsFollowing
  );
  return (
    <div className="s_profile">
      <img
        style={{
          width: "2.2rem",
          height: "2.2rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={data?.causerId?.imgUrl}
      />
      <div style={{ display: "flex", flexDirection: "row", width: "7rem" }}>
        <span
          className="not-content"
          style={{ fontWeight: 700, textAlign: "left" }}
        >
          {data?.causerId?.userName}
          <span
            style={{
              fontColor: "black",
              fontWeight: 400,
              marginLeft: "0.2rem",
            }}
          >
            {data?.message}
            <span style={{ marginLeft: "0.2rem", color: "#b8bfcb" }}>
              {moment(data?.timeStamp)
                .fromNow(true)
                .replace(" days", "d")
                .replace(" minutes", "m")}
            </span>
          </span>
        </span>
      </div>
      {!followingState?.isFollowing ? (
        <div
          onClick={submitFollow}
          style={{
            justifySelf: "flex-end",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="cta"
        >
          <div style={{ margin: "0" }}>
            {!isLoading ? (
              <i style={{ color: "#2e69ff" }} class="fa-solid fa-user-plus"></i>
            ) : (
              <ClipLoader color={"white"} loading={isLoading} size={10} />
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            justifySelf: "flex-end",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c4c6c6",
          }}
          className="cta"
        >
          <div style={{ margin: "0" }}>
            <i style={{ color: "#f7f7f8" }} class="fa-solid fa-user-check"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default A_Profile;
