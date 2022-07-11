import axios from 'axios'
import {React, useState, useContext} from 'react'
import ContentLoader from 'react-content-loader'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { userContext } from '../../contexts/UserContext'
import '../../styles/Sidebar.css'
import Pcreate from './Pcreate'



const Sidebar = () => {

  const {data:user} = useContext(userContext)
  const [cOpen, setCOpen] = useState(false)
  
  const getTopCommunities  = async () => {
    const topCommunities = await axios({method: 'get',url: 'http://localhost:5000/community/top',withCredentials: true})
    return topCommunities.data
  }

  const {data: t_communities, isLoading} = useQuery('topCommunities', getTopCommunities)
  return (
    <div className='sidebar'>

        <div className='sticky-container'>
            <button onClick={() => setCOpen(true)} className='create-space-btn-two'>
            <span class="iconify" data-icon="carbon:add" data-width="18"></span>
               Create Space 
            </button>

            {
                t_communities?.map((community) => {
                return (

                    <Link style={{textDecoration: 'none', color: 'black'}}  to = {`/spaces/${community._id}`}>
                          <div className='space-profile-container'>
                            <div className='profile-elements'>
                              <img style={{background: 'white'}} className='space-img' src={community.communityIcon}/>
                              <span style={{marginBottom: 0, fontSize: '13px', fontWeight: 400, color: '#636466'}} className='space-name'>{community.communityName}</span>
                            </div>
                          </div>
                    </Link>

                )
              })
           }
            
        </div>


        {/* {user ? <div className='profile-section-home'>
          <div className='profile-elements'>
            <img className='profile-section-img' src={user.imgUrl}/>
            <div className='profile-section-content'>
                <span className='profile-section-name'>{user.userName}</span>
                <span className='profile-section-at'>@{user.userName.toLowerCase()}</span>
            </div>
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
                    </ContentLoader>} */}
        {/* <div className='suggested-section'>
          <ul>

          </ul>
          <p>Top Spaces</p>
          <button style={{backgroundColor:'#2e69ff', color: 'white', borderRadius: '4px', fontWeight: 'bold'}} onClick={() => setCOpen(true)}><span class="iconify" data-icon="ic:baseline-plus"> </span>Create Space </button>
          {isLoading && <div class="loadingio-spinner-spinner-2gw7yb8gxej"><div class="ldio-h3evnyucb7">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>} */}
          {/* {t_communities?.map((community) => {
            return (

             <Link style={{textDecoration: 'none', color: 'black'}}  to = {`/spaces/${community._id}`}>
                   <div className='space-profile-container'>
                      <div className='profile-elements'>
                        <img style={{background: 'white'}} className='space-img' src={community.communityIcon}/>
                        <span style={{marginBottom: 0, fontSize: '0.9rem', fontWeight: 600}} className='space-name'>{community.communityName}</span>
                      </div>
                    </div>
             </Link>

            )
          })}
        </div> */}
        <Pcreate show={cOpen} toggle = {setCOpen} post ={false}/>
    </div>
  )
}

export default Sidebar