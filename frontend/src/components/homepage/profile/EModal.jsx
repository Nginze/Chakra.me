import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { userContext } from "../../../contexts/UserContext";
import "../../../styles/EModal.css";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const EModal = ({ show, toggle }) => {
  const { data: user } = useContext(userContext);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUserName(user?.userName);
    setBio(user?.bio);
  }, [user]);

  const updateUser = async () => {
    setLoading(true);
    const res = await axios({
      method: "put",
      url: `http://localhost:5000/user/${user._id}/changeDetails`,
      withCredentials: true,
      data: {
        userName: userName,
        bio: bio,
        imgbase64: previewSource,
      },
    });
    toast.success("user data saved")
    toggle(false)
    setLoading(false);
    console.log(res);
  };

  const handleFileInput = e => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    show && (
      <>
        <div className="modal-background"></div>
        <div
          id="e-modal"
          className="animate__animated animate__fadeIn animate__faster"
        >
          <span onClick={() => toggle(false)} class="close">
            &times;
          </span>

          <div className="profile-section">
            <div className="profile-elements">
              <img className="profile-section-img" src={user?.imgUrl} />
              <div id="e-modal-meta">
                <span className="profile-section-name">{user?.userName}</span>
                <label for="img-up" className="img-upload-btn">
                  <span class="iconify" data-icon="ph:image-thin"></span>{" "}
                  <input
                    type="file"
                    value={fileInput}
                    onChange={handleFileInput}
                    id="img-up"
                  />
                </label>
              </div>
            </div>
            <div className="space-name">
              <label>Username</label>
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
              <span>Enter your new prefered username</span>
            </div>
            <div className="space-description">
              <label>Bio</label>
              <input value={bio} onChange={e => setBio(e.target.value)} />
              <span>
                Include a few keywords to show people what you are all about
              </span>
            </div>
          </div>
          <div className="modal-cta">
            <button onClick={() => toggle(false)} className="cancel-btn">
              Cancel
            </button>
            <button onClick={updateUser} className="post-btn">
              {!loading ? (
                <span>Save</span>
              ) : (
                <ClipLoader color={"white"} loading={loading} size={10} />
              )}
            </button>
          </div>
          {previewSource && (
            <>
              {" "}
              <img
                style={{
                  width: "60px",
                  height: "40px",
                  marginLeft: "1rem",
                  objectFit: "cover",
                  padding: "0.2rem",
                  marginTop: "1rem",
                }}
                src={previewSource}
              />{" "}
              <span></span>
            </>
          )}
        </div>
      </>
    )
  );
};

export default EModal;
