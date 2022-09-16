import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";

const Dropdown = ({ show, anchorEl, open, handleClose, notifications }) => {
  return (
    <Menu
      id="noti-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Stack sx={{ width: "20rem" }}>
        <Stack
          direction={"row"}
          padding={"0.5rem 1rem"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Notifications</Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Stack>
        {notifications?.map(notification => (
          <MenuItem>
            <Stack direction={"row"} alignItems={"flex-start"}>
              <Avatar
                sx={{ width: "44px", height: "44px", marginRight: "0.5rem" }}
                src={notification.causerId.imgUrl}
              />
              <Stack>
                <Typography>{notification.causerId.userName}</Typography>
                <Typography fontSize={"0.9rem"} fontWeight={400}>
                  {notification.message}
                </Typography>
                <Typography fontSize={"0.7rem"}>1m</Typography>
              </Stack>
            </Stack>
          </MenuItem>
        ))}
      </Stack>
    </Menu>
  );
};

export default Dropdown;
