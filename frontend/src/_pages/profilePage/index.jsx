import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import TabMenu from "./components/TabMenu";

const Index = () => {
  const { data: user } = useContext(userContext);
  return (
    <Stack
      marginTop={"6rem"}
      justifyContent={"center"}
      width={"100vw"}
      direction={"row"}
    >
      <Stack width={"65%"} direction={"row"}>
        <Stack marginRight={"8rem"} flex={1.8}>
          <Profile user={user} />
          <TabMenu  />
        </Stack>
        <Stack flex={0.7}>
          <SideBar />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Index;
