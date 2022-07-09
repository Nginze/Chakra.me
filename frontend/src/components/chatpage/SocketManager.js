import {io} from 'socket.io-client'

const socket = io("ws://localhost:8900")

socket.current.on("send-active-users", (activeUsers) => {
    setActiveUsers(activeUsers)
});

  useEffect(() => {
    user && socket.current.emit("check-in", user._id);
  }, [user]);