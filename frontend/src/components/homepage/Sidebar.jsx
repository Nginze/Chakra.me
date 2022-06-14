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
          <p>Top Spaces</p>
          <button style={{backgroundColor:'#2e69ff', color: 'white', borderRadius: '4px', fontWeight: 'bold'}} onClick={() => setCOpen(true)}><span class="iconify" data-icon="ic:baseline-plus"> </span>Create Space </button>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://avatarfiles.alphacoders.com/313/313232.jpg'/>
              <span style={{marginBottom: 0, fontSize: '0.9rem', fontWeight: 600}} className='space-name'>Computer Science</span>
            </div>
           
           
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://cdn.dribbble.com/users/1551609/screenshots/6681276/snakedev-dribbble_4x.png'/>
              <span style={{marginBottom: 0, fontSize: '0.9rem', fontWeight: 600}} className='space-name'>Web Development</span>
            </div>
           
           
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ywPmaC9PBWrPfaOzZuL6baNRCOQfOQJk7w&usqp=CAU'/>
              <span style={{marginBottom: 0, fontSize: '0.9rem', fontWeight: 600}} className='space-name'>Gaming</span>
            </div>
           
           
          </div>
          <div className='space-profile-container'>
            <div className='profile-elements'>
              <img className='space-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6gTnjSSaadPQ8-Nk6lg0-mgmkJsNf_N2CkQ&usqp=CAU'/>
              <span style={{marginBottom: 0, fontSize: '0.9rem', fontWeight: 600}} className='space-name'>React Js</span>
            </div>
           
           
          </div>
        </div>
        <Pcreate show={cOpen} toggle = {setCOpen} post ={false}/>
    </div>
  )
}

export default Sidebar