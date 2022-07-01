import {React, useState, useContext, useEffect} from 'react'
import LoadingBar from 'react-top-loading-bar'
import { userContext } from '../../contexts/UserContext'
import {Link} from 'react-router-dom'
import '../../styles/Nav.css'
import LModal from './LModal'
import Pcreate from './Pcreate'
import { usersContext } from '../../contexts/UsersContext'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'





const Nav = () => {
  const [cModalOpen, setCOpen] = useState(false)
  const [lModalOpen, setLOpen] = useState(false)
  const [pMenuOpen, setPOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearhContainer, setSearchContainer] = useState(false)
  const {data:user, getUser} = useContext(userContext)
  const {users, setUsers, progress, setProgress} = useContext(usersContext)
  const queryClient = useQueryClient()

  const Search = async() => {
    console.log(searchResults)
    const res =  await axios({method: 'get',url: `http://localhost:5000/user/search/users?q=${searchTerm}`,withCredentials: true})
    setSearchResults(res.data)
  }

  return (
  <>
    <div className='main-container'>
        <nav className='nav-container'>
          <div className='logo'><img src="https://img.icons8.com/color/30/000000/naruto-sign.png"/>Chakra.me</div>
          <div className='search-container'>
              <span id="search-icon" class="iconify" data-icon="ic:baseline-search"></span>
              <input onClick={() => setSearchContainer(true)} className='search' value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value);Search()}} placeholder='Search users on chakra...'/>
              {showSearhContainer && <div className='search-results-container'>
                  <span onClick={() => setSearchContainer(false)} style ={{padding: '0.4rem', fontSize: '1rem'}} class="close">&times;</span>
                  
                   {  
                       
                          searchResults.map((_user) => {
                          return(
                            <Link onClick={queryClient.refetchQueries(['other'])} style={{textDecoration:'none', color: 'black'}} to = {user?._id == _user._id ? '/profile' :`/profiles/${_user.userName}/${_user._id}`}>
                              <div style={{marginTop: 0, marginBottom: '0.5rem'}}  className='post-info'>
                                    <img className='post-profile-img' src={_user.imgUrl}/>
                                    <div className='post-profile-info'>
                                      <span className='profile-author'>{_user.userName}</span>
                                    </div>
                              </div>
                            </Link>
                          )
                        })
                        // :users && users.filter((user) => {
                        //     return user.userName.toLowerCase().includes(searchTerm.toLowerCase())
                        // }).map((user) => {
          
                        //   return (
                        //     <Link  onClick={queryClient.refetchQueries(['other'])}  style={{textDecoration:'none', color: 'black'}}  to = {`/profiles/${user.userName}/${user._id}`}>
                        //       <div  className='post-info'>
                        //             <img className='post-profile-img' src={user.imgUrl}/>
                        //             <div className='post-profile-info'>
                        //               <span className='profile-author'>{user.userName}</span>
                        //             </div>
                        //       </div>
                        //     </Link>
                        //   )
                        // })
                    
                    }
                    
                  
              </div>}
          </div>
          
          <div className='nav-links'>
              <Link style={{textDecoration:'none', color: 'black'}} to="/"><div><i class="fi fi-rs-home"></i></div></Link>
              <div><i class="fi fi-rs-paper-plane"></i></div>
              <div onClick={() => setCOpen(true)}><i class="fi fi-rs-add"></i></div>
              <div><i class="fi fi-rs-navigation"></i></div>
              {!user ? <div onClick={() => setLOpen(true)}><i class="fi fi-rs-user"></i></div> : <div className='nav-profile'>
                                                                                                      <img onClick={() => setPOpen(!pMenuOpen)} class = 'post-profile-img' src= {user.imgUrl}/>
                                                                                                      {/* <img  className='drop-btn' src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-1.png"/> */}
                                                                                                      { pMenuOpen && <div onFo className='profile-menu animate__animated animate__zoomIn animate__faster'>
                                                                                                        <Link  onClick={() => setPOpen(false)} to = '/profile'><img style={{marginRight: '0.3rem'}} src="https://img.icons8.com/material-outlined/18/000000/home--v2.png"/>Account</Link>
                                                                                                        <Link  onClick={() => setPOpen(false)} to = '/logout' ><img style={{marginRight: '0.3rem'}} src="https://img.icons8.com/material-outlined/18/000000/exit.png"/>Logout</Link>
                                                                                                      </div>}
                                                                                                 </div>}
          </div>
        </nav>
        <Pcreate show = {cModalOpen} toggle = {setCOpen} post = {true} />
        <LModal show = {lModalOpen} toggle = {setLOpen}/>
    </div>
    <LoadingBar
    color='#f11946'
    progress={progress}
    onLoaderFinished={() => setProgress(0)}
  />
</>
  )
}

export default Nav