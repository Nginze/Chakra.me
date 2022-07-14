import axios from "axios";
import moment from "moment";
import { React, useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { userContext } from "../../contexts/UserContext";
import "../../styles/A_Profile.css";

const Notification = ({ data }) => {
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
    <div style={{ padding: "5px 0" }} className="s_profile">
      <img
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={data?.causerId?.imgUrl}
      />
      <div style={{ display: "flex", flexDirection: "row", width: "80%" }}>
        <span style={{ width: "300px", display: "flex" }}>
          <span style={{ textAlign: "left", flexDirection: "row" }}>
            <span
              style={{
                fontWeight: "700",
                marginRight: "0.2rem",
                display: "inline",
              }}
            >
              {data?.causerId?.userName}
            </span>
            {data?.message}
            <span
              style={{
                marginLeft: "0.5rem",
                color: "#b8bfcb",
                display: "inline",
              }}
            >
              {moment(data?.timeStamp)
                .fromNow(true)
                .replace(" days", "d")
                .replace(" minutes", "m")}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Notification;
