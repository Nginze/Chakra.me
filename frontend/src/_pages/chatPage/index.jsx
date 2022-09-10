import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import ChatBox from "./components/ChatBox";
import SocketProvider from "./contexts/SocketContext";
const Index = ({ socket }) => {
  const {data:user} = useContext(userContext)
  socket.emit("log_in", user?._id)
  return (
    <>
      <SocketProvider socket={socket}>
        <div style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
          <ChatBox />
        </div>
      </SocketProvider>
    </>
  );
};

export default Index;
