import React, { useContext, useState } from "react";
import {
  ListItem,
  Avatar,
  ListItemText,
  ListItemIcon,
  Badge,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import useMessages from "../hooks/useMessages";
import { useEffect } from "react";
import { countUnread } from "../utils";
import { useQueryClient } from "react-query";

const Chat = ({
  conversationId,
  avatar,
  username,
  isOnline,
  lastMessage,
  msgTrigger,
  lastSeen,
  openChat,
  updateLastSeen,
  user,
}) => {
  const queryClient = useQueryClient();
  const { messages } = useMessages(conversationId);
  const [unreadCount, setUnread] = useState(0);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 4.5,
      top: 23,
      border: `2px solid ${theme.palette.background.paper}`,
      backgroundColor: "#77de44",
      padding: "0 4px",
    },
  }));

  useEffect(() => {
    if (openChat && openChat[0].conversationId === conversationId) {
      setUnread(0);
      updateLastSeen(conversationId, user?._id);
    } else {
      setUnread(
        countUnread(
          queryClient.getQueryData(["messages", conversationId]),
          lastSeen
        )
      );
    }
  }, [msgTrigger, messages]);
  return (
    <ListItem
      onClick={() => setUnread(0)}
      sx={{ padding: "8px 20px", position: "relative" }}
      button
      key="RemySharp"
    >
      <ListItemIcon sx={{ width: "56px", height: "56px", marginRight: "12px" }}>
        {isOnline ? (
          <StyledBadge
            color="success"
            overlap="circular"
            badgeContent=" "
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              sx={{ width: "100%", height: "100%" }}
              alt={username}
              src={avatar}
            />
          </StyledBadge>
        ) : (
          <Avatar
            sx={{ width: "100%", height: "100%" }}
            alt={username}
            src={avatar}
          />
        )}
      </ListItemIcon>
      <Box>
        <ListItemText
          primary={username}
          secondary={
            isOnline
              ? "Active Now"
              : queryClient.getQueryData(["messages", conversationId])
              ? queryClient
                  .getQueryData(["messages", conversationId])
                  [
                    queryClient.getQueryData(["messages", conversationId])
                      ?.length - 1
                  ]?.message?.slice(0, 30) + "..."
              : null
          }
        />
      </Box>
      <Box sx={{ position: "absolute", right: 50 }}>
        <Badge badgeContent={unreadCount} color="primary" />
      </Box>
    </ListItem>
  );
};

export default Chat;
