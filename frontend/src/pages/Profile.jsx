import { React, useContext } from "react";
import { Toaster } from "react-hot-toast";
import PInfo from "../components/homepage/profile/PInfo";
import PTray from "../components/homepage/profile/PTray";
import { userContext } from "../contexts/UserContext";
import "../styles/Profile.css";

const Profile = () => {
  const { data: user } = useContext(userContext);
  return (
    <div id="profile">
      <Toaster/>
      <PInfo user={user} />
      <PTray user={user} />
    </div>
  );
};

export default Profile;
