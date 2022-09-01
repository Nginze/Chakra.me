import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/homepage/Nav";
import UserProvider from "./contexts/UserContext";
import UsersProvider from "./contexts/UsersContext";
import Callback from "./pages/Callback";
// import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewProfile from "./pages/NewProfile";
import Other from "./pages/Other";
import Profile from "./pages/Profile";
import Spaces from "./pages/Spaces";
import Chat from "./_pages/chatPage"
import { PrivateRoutes } from "./Utils/PrivateRoutes";

function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <UsersProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/test" element={<NewProfile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profiles/:username/:id" element={<Other />} />
              <Route path="/direct" element={<Chat />} />
              <Route path="/spaces/:id" element={<Spaces />} />
            </Route>
          </Routes>
        </UsersProvider>
      </UserProvider>
    </div>
  );
}

export default App;
