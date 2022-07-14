import axios from "axios";
import { React, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from "../../contexts/UserContext";

const StoryPreview = ({ showBanner, toggle, reduceIndex }) => {
  const { data: user } = useContext(userContext);
  const [fileInput, setFileInput] = useState("");
  const [postActive, setPostActive] = useState(true);
  const [message, setMessage] = useState("");
  const [previewSourceOne, setPreviewSourceOne] = useState(null);
  const [previewSourceTwo, setPreviewSourceTwo] = useState(null);
  const [previewSourceThree, setPreviewSourceThree] = useState(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const saveImageUpdate = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: `http://localhost:5000/story/`,
      withCredentials: true,
      data: {
        imgbase64: previewSourceOne,
        userId: user._id,
      },
    }).then(response => {
      setLoading(false);
      reduceIndex();
      toggle(false);
      toast.success(`Added to Story`);
    });
  };

  const saveTextUpdate = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: `http://localhost:5000/story/`,
      withCredentials: true,
      data: {
        message: message,
        userId: user._id,
      },
    }).then(response => {
      setLoading(false);
      reduceIndex(false);
      toggle(false);
      toast.success(`Added to Story`);
    });
  };
  const handleFileInput = e => {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }
    previewFile(files);
  };

  const previewFile = files => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        if (i == 0) {
          setPreviewSourceOne(reader.result);
        }

        if (i == 1) {
          setPreviewSourceTwo(reader.result);
        }

        if (i == 2) {
          setPreviewSourceThree(reader.result);
        }
      };
    }
  };

  return (
    showBanner && (
      <>
        <div className="modal-background"></div>
        <div
          id="e-modal"
          className="animate__animated animate__fadeIn animate__faster"
        >
          <div style={{ width: "100%" }} className="modal-head">
            <span
              onClick={() => {
                toggle(false);
                reduceIndex(false);
              }}
              class="close"
            >
              &times;
            </span>
            <div class="modal-toggles">
              <button
                onClick={() => setPostActive(false)}
                id={!postActive ? "active" : ""}
                className="create-space-btn"
              >
                Upload Media
              </button>
              <button
                onClick={() => setPostActive(true)}
                id={postActive ? "active" : ""}
                className="create-post-btn"
              >
                Text Story
              </button>
              {!postActive ? (
                <div style={{ width: "40%" }} className="underline-space"></div>
              ) : (
                <div style={{ width: "40%" }} className="underline-post"></div>
              )}
            </div>
          </div>
          {!postActive ? (
            <div
              style={{
                width: "100%",
                height: "75%",
                marginLeft: "auto",
                padding: "1rem",
              }}
              className="profile-section"
            >
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <span
                  style={{
                    color: "black",
                    textAlign: "left",
                    marginBottom: "0.7rem",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Preview
                </span>
                {!previewSourceOne && (
                  <div
                    style={{
                      color: "black",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px dashed #8f93f3",
                      borderRadius: "8px",
                      padding: "3rem",
                      cursor: "pointer",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      for="img-up"
                    >
                      <span
                        style={{ cursor: "pointer", color: "#8f93f3" }}
                        class="iconify"
                        data-icon="bi:cloud-upload"
                        data-width="70"
                      ></span>
                      <span style={{ marginTop: "1rem" }}>No file chosen</span>
                      <input
                        type="file"
                        multiple
                        value={fileInput}
                        onChange={handleFileInput}
                        id="img-up"
                      />
                    </label>
                  </div>
                )}
                {previewSourceOne && (
                  <label
                    style={{
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                    for="img-up"
                    className="img-upload-btn"
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      class="iconify"
                      data-icon="ph:image-thin"
                      data-width="25"
                    ></span>{" "}
                    <input
                      multiple
                      type="file"
                      value={fileInput}
                      onChange={handleFileInput}
                      id="img-up"
                    />
                  </label>
                )}
                <div
                  style={{
                    maxHeight: "200px",
                    height: "150px",
                    maxWidth: "100%",
                    display: "flex",
                    overflowX: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {previewSourceOne && (
                    <img
                      style={{
                        width: "100%",
                        height: "70%",
                        objectFit: "cover",
                        marginRight: "0.5rem",
                      }}
                      src={previewSourceOne}
                    />
                  )}
                  {previewSourceTwo && (
                    <img
                      style={{
                        width: "100%",
                        height: "70%",
                        objectFit: "cover",
                        marginRight: "0.5rem",
                      }}
                      src={previewSourceTwo}
                    />
                  )}
                  {previewSourceThree && (
                    <img
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "cover",
                        marginRight: "0.5rem",
                      }}
                      src={previewSourceThree}
                    />
                  )}
                </div>
              </div>
              <div className="modal-cta">
                <button onClick={() => toggle(false)} className="cancel-btn">
                  Cancel
                </button>
                <button
                  onClick={saveImageUpdate}
                  style={{ width: "7rem" }}
                  className="post-btn"
                >
                  {!loading ? (
                    <span>Add to Story</span>
                  ) : (
                    <ClipLoader color={"white"} loading={loading} size={10} />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%" }} className="post-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                {user && <img className="prf" src={user.imgUrl} />}
                <span
                  style={{ marginLeft: "0.5rem", fontSize: "0.9rem" }}
                ></span>
              </div>

              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Say something..."
                className="wrapper-class"
              />
              <div className="modal-cta">
                <button onClick={() => toggle(false)} className="cancel-btn">
                  Cancel
                </button>
                <button
                  onClick={saveTextUpdate}
                  style={{ width: "7rem" }}
                  className="post-btn"
                >
                  {!loading ? (
                    <span>Add to Story</span>
                  ) : (
                    <ClipLoader color={"white"} loading={loading} size={10} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default StoryPreview;
