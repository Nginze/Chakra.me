import Chat from "./components/Chat";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import Message from "./components/Message";

const Index = () => {
  return (
    <>
      <div style={{ width: "100vw", height: '100vh', overflowX: "hidden" }}>
        <ChatBox />
      </div>
    </>
  );
};

export default Index;
