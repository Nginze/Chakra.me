import axios from "axios";
import { React, useContext, useState } from "react";
import Tooltip from "react-power-tooltip";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { userContext } from "../../contexts/UserContext";
import { usersContext } from "../../contexts/UsersContext";
import "../../styles/Nav.css";
import LModal from "./LModal";
import Notification from "./Notification";
import Pcreate from "./Pcreate";

const Nav = () => {
  const navigate = useNavigate();
  const [cModalOpen, setCOpen] = useState(false);
  const [lModalOpen, setLOpen] = useState(false);
  const [pMenuOpen, setPOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearhContainer, setSearchContainer] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: user, getUser } = useContext(userContext);
  const { users, setUsers, progress, setProgress } = useContext(usersContext);
  const isLoginScreen = window.location.pathname === "/";
  const queryClient = useQueryClient();

  const getActivity = async () => {
    const activities = await axios({
      method: "get",
      url: `http://localhost:5000/notification/${user._id}`,
      withCredentials: true,
    });
    return activities.data;
  };

  const Search = async () => {
    console.log(searchResults);
    const res = await axios({
      method: "get",
      url: `http://localhost:5000/user/search/users?q=${searchTerm}`,
      withCredentials: true,
    });
    setSearchResults(res.data);
  };

  const { data: activity, isLoading: a_loading } = useQuery(
    "activity",
    getActivity,
    {
      enabled: !!user,
    }
  );

  return (
    !isLoginScreen && (
      <>
        <div className="main-container">
          <nav className="nav-container">
            <Link style={{ textDecoration: "none", color: "black" }} to="/home">
              <div className="logo">
                <img src="https://img.icons8.com/color/30/000000/naruto-sign.png" />
                Chakra.me
              </div>
            </Link>
            <div className="search-container">
              <span
                id="search-icon"
                class="iconify"
                data-icon="ic:baseline-search"
              ></span>
              <input
                onClick={() => setSearchContainer(true)}
                className="search"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  Search();
                }}
                placeholder="Search users on chakra..."
              />
              {showSearhContainer && (
                <div className="search-results-container">
                  <span
                    onClick={() => setSearchContainer(false)}
                    style={{ padding: "0.4rem", fontSize: "1rem" }}
                    class="close"
                  >
                    &times;
                  </span>

                  {searchResults.map(_user => {
                    return (
                      <Link
                        onClick={queryClient.refetchQueries(["other"])}
                        style={{ textDecoration: "none", color: "black" }}
                        to={
                          user?._id == _user._id
                            ? "/profile"
                            : `/profiles/${_user.userName}/${_user._id}`
                        }
                      >
                        <div
                          style={{ marginTop: 0, marginBottom: "0.5rem" }}
                          className="post-info"
                        >
                          <img
                            className="post-profile-img"
                            src={_user.imgUrl}
                          />
                          <div className="post-profile-info">
                            <span className="profile-author">
                              {_user.userName}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="nav-links">
              <Link to="/direct">
                <span
                  class="iconify"
                  data-icon="bi:chat-dots"
                  data-width="20"
                ></span>
              </Link>
              <div
                className="notification"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                style={{ position: "relative" }}
              >
                <span
                  class="iconify"
                  data-icon="ic:outline-notifications"
                  data-width="20"
                ></span>
                <Tooltip
                  show={showNotifications}
                  arrowAlign="end"
                  position="bottom center"
                  lineSeparated
                  textBoxWidth="250px"
                  fontWeight="400"
                  moveDown="10px"
                >
                  <div style={{ width: "100%" }}>
                    <span className="notification-header">Notifications</span>
                    {activity?.map(activity => {
                      return <Notification data={activity} />;
                    })}
                  </div>
                </Tooltip>
              </div>
              {/* <Link style={{textDecoration:'none', color: 'black'}} to="/"><div><i class="fi fi-rs-home"></i></div></Link> */}
              {/* <div><span class="iconify" data-icon="cil:home"></span></div>
              <div onClick={() => setCOpen(true)}><i class="fi fi-rs-add"></i></div>
              <div><i class="fi fi-rs-navigation"></i></div> */}
              {!user ? (
                <div
                  className="empty-user-state"
                  onClick={() => setLOpen(true)}
                ></div>
              ) : (
                <div
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="nav-profile"
                >
                  <Tooltip
                    show={showProfileMenu}
                    arrowAlign="end"
                    position="bottom center"
                    lineSeparated
                    textBoxWidth="200px"
                    fontWeight="400"
                    moveDown="10px"
                  >
                    <div onClick={() => navigate("/profile")}>
                      <div className="account-btn">
                        <img className="tool-tip-img" src={user.imgUrl} />
                        <div className="account-name">
                          Welcome, {user.userName} 👋
                          <span
                            class="iconify"
                            data-icon="bytesize:chevron-right"
                            data-width="14"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="logout-btn">
                      <div>
                        <span
                          class="iconify"
                          data-icon="carbon:logout"
                          data-width="13"
                        ></span>
                        logout
                      </div>
                    </div>
                  </Tooltip>
                  <img class="post-profile-img" src={user.imgUrl} />
                  {/* <img  className='drop-btn' src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-1.png"/> */}
                  {/* { pMenuOpen && <div onFo className='profile-menu animate__animated animate__zoomIn animate__faster'>
                      <Link  onClick={() => setPOpen(false)} to = '/profile'><img style={{marginRight: '0.3rem'}} src="https://img.icons8.com/material-outlined/18/000000/home--v2.png"/>Account</Link>
                      <Link  onClick={() => setPOpen(false)} to = '/logout' ><img style={{marginRight: '0.3rem'}} src="https://img.icons8.com/material-outlined/18/000000/exit.png"/>Logout</Link>
                  </div>} */}
                </div>
              )}
            </div>
          </nav>
          <Pcreate show={cModalOpen} toggle={setCOpen} post={true} />
          <LModal show={lModalOpen} toggle={setLOpen} />
        </div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      </>
    )
  );
};

export default Nav;
