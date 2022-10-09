import { Box, Button, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import React from "react";

const InteractionTray = () => {
  return (
    <Box>
      <Stack direction={"row"}>
        <Button sx={{ color: "#888a8c", marginRight: "4px" }}>
          <ModeCommentOutlinedIcon
            sx={{ width: "26px", height: "26px", marginRight: "4px" }}
          />
          <Typography fontSize="12px" fontWeight="700">
            100 comments
          </Typography>
        </Button>
        <Button sx={{ color: "#888a8c", marginRight: "4px" }}>
          <LocalFireDepartmentOutlinedIcon
            sx={{ width: "30px", height: "30px", marginRight: "4px" }}
          />
          <Typography fontSize={"12px"} fontWeight="700">
            Chakra
          </Typography>
        </Button>
        <Button sx={{ color: "#888a8c", marginRight: "4px" }}>
          <BookmarkBorderOutlinedIcon sx={{ width: "26px", height: "26px", marginRight: '4px' }} />
          <Typography fontSize="12px" fontWeight="700">
            Save
          </Typography>
        </Button>
        <IconButton>
            <MoreHorizIcon/>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InteractionTray;
