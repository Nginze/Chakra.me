import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { userContext } from "../../../contexts/UserContext";
import {
  Autocomplete,
  Avatar,
  Icon,
  InputAdornment,
  TextField,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import useNotifications from "../hooks/useNotifications";
import axios from "axios";
import { useQueryClient } from "react-query";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: "4px",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { data: user } = React.useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAchorEl, setNotificationAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(notificationAchorEl);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { notifications } = useNotifications(user?._id);
  const Logout = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:5000/user/logout`,
      withCredentials: true,
    });
    navigate("/");
    queryClient.invalidateQueries("user");
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = event => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        <Stack>
          <Avatar src={user?.imgUrl} alt={user?.userName} />
          <Typography
            fontSize={"small"}
            fontWeight={400}
            display={"flex"}
            alignItems={"center"}
          >
            Welcome, {user?.userName} 👋
            <ChevronRightOutlined />
          </Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          Logout()
        }}
      >
        <ExitToAppOutlined fontSize="small" sx={{ marginRight: "0.5rem" }} />
        <Typography fontSize={"0.8rem"}>Log Out</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <EmailOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="medium"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;",
        }}
      >
        <Toolbar
          sx={{
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <div className="logo">
                <img src="https://img.icons8.com/color/30/000000/naruto-sign.png" />
                Chakra
              </div>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0.5 }}>
            <Autocomplete
              freeSolo
              fullWidth
              size="small"
              id="free-solo-2-demo"
              disableClearable
              options={[1, 2, 3, 4].map(option => option)}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Search chakra"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="emojis">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large">
              <HomeOutlinedIcon fontSize="medium" />
            </IconButton>
            <IconButton size="large">
              <BallotOutlinedIcon fontSize="medium" />
            </IconButton>
            {/* <IconButton size="small">
              <Diversity1OutlinedIcon fontSize="large" />
            </IconButton> */}
            <IconButton
              onClick={() => navigate("/direct")}
              size="large"
              aria-label="show 4 new mails"
            >
              <Badge badgeContent={0} color="error">
                <EmailOutlinedIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              id="basic-button"
              aria-controls={isNotificationOpen ? "noti-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isNotificationOpen ? "true" : undefined}
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsNoneOutlinedIcon fontSize="nedium" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{ width: "24px", height: "24px" }}
                alt={user?.userName}
                src={user?.imgUrl}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Dropdown
        anchorEl={notificationAchorEl}
        open={isNotificationOpen}
        handleClose={handleNotificationMenuClose}
        notifications={notifications}
      />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
