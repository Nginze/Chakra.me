import { React } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const S_Profile = ({ data }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return (
    <div onClick={() => {queryClient.invalidateQueries("other");navigate(`/profiles/${data.userName}/${data._id}`)} } className="s_profile">
      <img
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={data?.imgUrl}
      />
      <div>
        <span style={{ fontWeight: 600 }}>{data.userName}</span>
        <span style={{ fontWeight: 600, color: "#bbbcbc" }}>
          @{data.userName}
        </span>
      </div>
    </div>
  );
};

export default S_Profile;
