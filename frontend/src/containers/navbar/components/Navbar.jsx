import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Autocomplete,
  Avatar, InputAdornment, TextField
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../contexts/UserContext";
import useNotifications from "../hooks/useNotifications";
import Dropdown from "./Dropdown";
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
  const [value, setValue] = useState("home");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          Logout();
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
          height: "48px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" }, marginRight: "4rem" }}
        >
          <div className="logo">
            <img src="https://img.icons8.com/color/30/000000/naruto-sign.png" />
            Chakra
          </div>
        </Typography>

        <Box sx={{ flexGrow: 0.5, marginRight: "4rem" }}>
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
                sx={{
                  width: "80%",
                }}
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
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            sx={{
              height: "32px",
              width: "32px",
              marginRight: "1rem",
            }}
            size="large"
            aria-label="show 17 new notifications"
            id="basic-button"
            aria-controls={isNotificationOpen ? "noti-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isNotificationOpen ? "true" : undefined}
            onClick={handleNotificationMenuOpen}
          >
            <AddIcon
              sx={{
                fontSize: "26px",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              height: "32px",
              width: "32px",
              marginRight: "1rem",
            }}
            size="large"
            aria-label="show 17 new notifications"
            id="basic-button"
            aria-controls={isNotificationOpen ? "noti-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isNotificationOpen ? "true" : undefined}
            onClick={handleNotificationMenuOpen}
          >
            <WhatshotIcon sx={{ fontSize: "26px" }} />
          </IconButton>
          <IconButton
            sx={{
              height: "32px",
              width: "32px",
              marginRight: "1rem",
            }}
            size="large"
            aria-label="show 17 new notifications"
            id="basic-button"
            aria-controls={isNotificationOpen ? "noti-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isNotificationOpen ? "true" : undefined}
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={0} color="error">
              <NotificationsNoneOutlinedIcon sx={{ fontSize: "26px" }} />
            </Badge>
          </IconButton>

          <IconButton
            sx={{
              height: "32px",
              width: "32px",
              marginRight: "1rem",
            }}
            size="large"
            aria-label="show 17 new notifications"
            id="basic-button"
            aria-controls={isNotificationOpen ? "noti-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isNotificationOpen ? "true" : undefined}
            onClick={handleNotificationMenuOpen}
          >
            <TextsmsOutlinedIcon
              sx={{
                fontSize: "26px",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              height: "32px",
              width: "32px",
              marginRight: "1rem",
            }}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              sx={{ width: "29px", height: "29px" }}
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
