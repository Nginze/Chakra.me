import { React } from "react";

const S_Profile = ({ data }) => {
  return (
    <div className="s_profile">
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
