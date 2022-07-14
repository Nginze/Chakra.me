import "@brainhubeu/react-carousel/lib/style.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { userContext } from "../../contexts/UserContext";
import "../../styles/Story.css";
import StoryPreview from "./StoryPreview";

const Story = ({ toggle, setStories, increaseIndex }) => {
  const [show, setShow] = useState(false);
  const { data: user } = useContext(userContext);
  const [showPrev, setPrev] = useState(false);
  const [showNext, setNext] = useState(true);
  const queryClient = useQueryClient();
  const scrollNext = () => {
    document.getElementById("next").addEventListener("click", () => {
      document
        .getElementById("str")
        .scrollTo(document.getElementById("str").scrollLeft + 200, 0);
    });
  };

  const scrollPrev = () => {
    document.getElementById("prev").addEventListener("click", () => {
      document
        .getElementById("str")
        .scrollTo(document.getElementById("str").scrollLeft - 200, 0);
    });
  };

  const setBtn = () => {
    setPrev(document.getElementById("str")?.scrollLeft != 0);
  };

  const getUserStory = async () => {
    const result = await axios({
      method: "get",
      url: `http://localhost:5000/story/${user._id}`,
      withCredentials: true,
    });
    return result.data;
  };
  const createNotfication = (message, story) => {
    if (story.views.includes(user._id) || story.userId._id == user._id) {
      return;
    }
    axios({
      method: "post",
      url: `http://localhost:5000/notification`,
      withCredentials: true,
      data: {
        userId: story.userId,
        causerId: user._id,
        message: message,
      },
    });
  };
  const submitView = async id => {
    await axios({
      method: "put",
      url: `http://localhost:5000/story/view/${id}`,
      withCredentials: true,
      data: { userId: user._id },
    });
    queryClient.invalidateQueries("user");
  };
  const { data: userStory } = useQuery("userStory", getUserStory, {
    enabled: !!user,
  });

  return (
    <>
      <main class="main">
        <span
          style={{ cursor: "pointer", display: "flex" }}
          id="next"
          onClick={scrollNext}
        >
          <i class="fa-solid fa-chevron-right"></i>
        </span>
        <span
          className={`${showPrev ? "b-active" : "not-active"}`}
          style={{ cursor: "pointer" }}
          id="prev"
          onClick={scrollPrev}
        >
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <section onScroll={setBtn} id="str" class="stories">
          <div class="stories__item ">
            <button>
              <div
                onClick={() => {
                  setStories(
                    userStory.stories.map(section => {
                      if (!section?.includes("https://")) {
                        return {
                          content: props => (
                            <div
                              style={{
                                background: "pink",
                                padding: 20,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <h3
                                style={{
                                  marginTop: 5,
                                  fontWeight: "600",
                                  fontSize: "1.6rem",
                                }}
                              >
                                {section}
                              </h3>
                            </div>
                          ),
                        };
                      }
                      return section;
                    })
                  );
                  toggle(true);
                }}
                class="stories__item-picture"
              >
                <img src={user?.imgUrl} alt="gail_pena's profile picture" />
              </div>
              <i
                onClick={() => {
                  setShow(true);
                  increaseIndex(true);
                }}
                style={{ color: "rgb(33, 118, 255)", backgroundColor: "white" }}
                className="fa-solid fa-circle-plus"
              ></i>
              <span class="stories__item-username">Your Story</span>
            </button>
          </div>

          {user?.storyInbox.map(story => {
            return (
              <div
                className={
                  story?.views?.includes(user._id)
                    ? `stories__item`
                    : `stories__item stories__item--active`
                }
              >
                <button
                  onClick={() => {
                    setStories(
                      story.stories.map(section => {
                        if (!section?.includes("https://")) {
                          return {
                            content: props => (
                              <div
                                style={{
                                  background: "pink",
                                  padding: 20,
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <h3
                                  style={{
                                    marginTop: 5,
                                    fontWeight: "600",
                                    fontSize: "1.6rem",
                                  }}
                                >
                                  {section}
                                </h3>
                              </div>
                            ),
                          };
                        }
                        return section;
                      })
                    );
                    toggle(true);
                    submitView(story._id);
                    createNotfication("viewed your story", story);
                  }}
                >
                  <div class="stories__item-picture">
                    <img
                      src={story?.userId?.imgUrl}
                      alt="gail_pena's profile picture"
                    />
                  </div>
                  <span class="stories__item-username">
                    {story?.userId?.userName}
                  </span>
                </button>
              </div>
            );
          })}
        </section>
      </main>

      <StoryPreview
        showBanner={show}
        toggle={setShow}
        reduceIndex={increaseIndex}
      />
    </>
  );
};

export default Story;
