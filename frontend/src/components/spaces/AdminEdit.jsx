import axios from "axios";
import { React, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";

const AdminEdit = ({ show, toggle, community }) => {
  const [spaceName, setSpaceName] = useState(community?.communityName);
  const [spaceDesc, setSpaceDesc] = useState(community?.communityDesc);
  const [spaceGuidelines, setSpaceGuidelines] = useState(
    community?.communityGuidelines
  );
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [formState, setFormState] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setSpaceName(community?.communityName);
    setSpaceDesc(community?.communityDesc);
    setSpaceGuidelines(community?.communityGuidelines);
  }, [community]);
  const saveUpdate = async () => {
    setLoading(true);

    if (!spaceName || !spaceDesc || !spaceGuidelines) {
      setFormState("All fields required");
    } else {
      setFormState("Looks Good!");

      await axios({
        method: "put",
        url: `http://localhost:5000/community/${community?._id}/update`,
        withCredentials: true,
        data: {
          communityName: spaceName,
          communityDesc: spaceDesc,
          communityGuidelines: spaceGuidelines,
          imgbase64: previewSource,
        },
      }).then(response => {
        queryClient.invalidateQueries("community");
        setLoading(false);
        toggle(false);
      });
    }
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

          <div
            style={{
              width: "100%",
              height: "75%",
              marginLeft: "auto",
              padding: "1rem",
              overflowY: "scroll",
            }}
            className="profile-section"
          >
            <div className="profile-elements">
              <img
                className="profile-section-img"
                src={community?.communityIcon}
              />
              <div id="e-modal-meta">
                <span className="profile-section-name">
                  {community?.communityName}
                </span>
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
              <label>Space Name</label>
              <input
                value={spaceName}
                onChange={e => setSpaceName(e.target.value)}
              />
              <span>Enter your new prefered space name</span>
            </div>

            <div className="space-description">
              <label>Description</label>
              <input
                value={spaceDesc}
                onChange={e => setSpaceDesc(e.target.value)}
              />
              <span>
                Include a few keywords to show people what you are all about
              </span>
            </div>
            <div className="space-description">
              <label>Guidelines & Rules</label>
              <input
                value={spaceGuidelines}
                onChange={e => setSpaceGuidelines(e.target.value)}
              />
              <span>
                Briefly explain what are the DOs and DON'Ts of this space
              </span>
            </div>
          </div>

          <div className="modal-cta">
            <button onClick={() => toggle(false)} className="cancel-btn">
              Cancel
            </button>
            <button
              onClick={saveUpdate}
              style={{ width: "5rem" }}
              className="post-btn"
            >
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
          {formState && (
            <span
              style={{
                padding: "1rem",
                color: `${
                  !spaceName || !spaceDesc || !spaceGuidelines ? "red" : "green"
                }`,
                fontSize: "0.9rem",
              }}
            >
              {!spaceName || !spaceDesc || !spaceGuidelines ? (
                <i
                  style={{ marginRight: "0.5rem" }}
                  class="fa-solid fa-triangle-exclamation"
                ></i>
              ) : (
                <i
                  style={{ marginRight: "0.5rem" }}
                  class="fa-solid fa-circle-check"
                ></i>
              )}
              {formState}
            </span>
          )}
        </div>
      </>
    )
  );
};

export default AdminEdit;
