
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Feed from './components/homepage/Feed';
import Nav from './components/homepage/Nav';
import Post from './components/homepage/Post';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Other from './pages/Other';
import Callback from './pages/Callback';
import UserProvider from './contexts/UserContext';
import PostProvider from './contexts/PostContext';
import UsersProvider from './contexts/UsersContext';
import Spaces from './pages/Spaces';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <UsersProvider>
        <Nav/>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path ='/profile' element = {<Profile/>}/>
          <Route path = '/profiles/:username/:id' element = {<Other/>}/>
          <Route path='/auth/callback' element = {<Callback/>} />
          <Route path = '/spaces' element = {<Spaces/>} />
        </Routes>
        </UsersProvider>
      </UserProvider>
        
    </div>
  );
}

export default App;
