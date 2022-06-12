import {React, useState, useContext} from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
import { userContext } from '../../contexts/UserContext'
import '../../styles/Sidebar.css'
import Pcreate from './Pcreate'


const Sidebar = () => {

  const {data:user} = useContext(userContext)
  const [cOpen, setCOpen] = useState(false)
  return (
    <div className='sidebar'>
        {user ? <div className='profile-section'>
          <div className='profile-elements'>
            <img className='profile-section-img' src={user.imgUrl}/>
            <span className='profile-section-name'>{user.userName}</span>
          </div>
          <Link to = "/profile"><button className='settings'> <span class="iconify" data-icon="mdi:cog-outline"></span> </button></Link>
        </div> :  <ContentLoader 
                      speed={2}
                      width={340}
                      height={84}
                      viewBox="0 0 340 84"
                      backgroundColor="#f3f3f3"
                 
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="67" height="11" /> 
                      <rect x="76" y="0" rx="3" ry="3" width="140" height="11" /> 
                      <rect x="127" y="48" rx="3" ry="3" width="53" height="11" /> 
                      <rect x="187" y="48" rx="3" ry="3" width="72" height="11" /> 
                      <rect x="18" y="48" rx="3" ry="3" width="100" height="11" /> 
                      <rect x="0" y="71" rx="3" ry="3" width="37" height="11" /> 
                      <rect x="18" y="23" rx="3" ry="3" width="140" height="11" /> 
                      <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
                    </ContentLoader>}
        <div className='suggested-section'>
          <p>Suggestions for you</p>
          <button onClick={() => setCOpen(true)}><span class="iconify" data-icon="ic:baseline-plus"> </span>Create Space </button>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://img.icons8.com/bubbles/100/000000/broken-computer.png'/>
              <span className='space-name'>Computer Science</span>
            </div>
           
            <button className='join'>Join</button>
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://img.icons8.com/bubbles/100/000000/broken-computer.png'/>
              <span className='space-name'>Computer Science</span>
            </div>
           
            <button className='join'>Join</button>
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://img.icons8.com/bubbles/100/000000/broken-computer.png'/>
              <span className='space-name'>Computer Science</span>
            </div>
           
            <button className='join'>Join</button>
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://img.icons8.com/bubbles/100/000000/broken-computer.png'/>
              <span className='space-name'>Computer Science</span>
            </div>
           
            <button className='join'>Join</button>
          </div>
        </div>
        <Pcreate show={cOpen} toggle = {setCOpen} post ={false}/>
    </div>
  )
}

export default Sidebar