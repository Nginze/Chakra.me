import { createContext } from "react";
export const socketContext = createContext();

const SocketProvider = ({ children, socket }) => {
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
