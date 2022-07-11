import {React, useContext, useState} from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/SpaceSideBar.css'
import AdminEdit from './AdminEdit'
import Rule from './Rule'

const SpaceSideBar = ({admins, members, isAdmin, community}) => {
    const [show, setShow] = useState(false)
    
  return (
    <div id='space-side-bar'>
        <div id = 'd-section'>
            <div className='d-header'>
                <span style={{fontWeight: '500'}}> About Community {isAdmin && <i onClick={() => setShow(!show)} style = {{marginLeft: '0.4rem', cursor: 'pointer'}}class="fa-solid fa-pen"></i>}</span>
            </div>
            <div style={{textAlign: 'left', fontSize: '15px'}} className='d-container'>
                <div className='d-desc'>
                A place where people can discuss Premier League Fantasy Football Teams, News, or anything else that might be helpful for fantasy managers.
                </div>
                <div className='d-stats'>
                    <span className='d-stat'>
                        <span>10k</span>
                        <span>Members</span>
                    </span>
                     <span className='d-stat'>
                        <span>10k</span>
                        <span>Members Online</span>
                    </span>
                </div>
                <div className='d-cta'>
                   <span style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '0.4rem'}} class="iconify" data-icon="fluent:food-cake-12-regular" data-width="15"></span>
                    Created Jul 21, 2022
                   </span> 
                   <button>
                    Create Post
                   </button>
                </div>
            </div>
        </div>

        <div id = 'd-section'>
            <div className='d-header'>
                <span style={{fontWeight: '500'}}> {community?.communityName} Rules {isAdmin && <i onClick={() => setShow(!show)} style = {{marginLeft: '0.4rem', cursor: 'pointer'}}class="fa-solid fa-pen"></i>}</span>
            </div>
            <div style={{textAlign: 'left', fontSize: '15px'}} className='d-container'>
               <Rule/>
               <Rule/>
               <Rule/>
            </div>
        </div>
        <div id='m-section'>
            <div className='m-header'>
                <span style={{fontWeight: '500'}}>Moderators</span>
            </div>
            <div className='m-container'>
                {admins?.map((admin) => {
                    return (
                        <div className='s_profile'>
                        <img style={{width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover'}} src = {admin.imgUrl}/>
                        <div >
                            <span style={{fontWeight: 600, display: 'flex', alignItems: 'center'}}>{admin.userName}<span style={{marginLeft: '0.3rem', color: '#9e9ea0'}} class="iconify" data-icon="cil:shield-alt"></span></span>
                            <span style={{fontWeight: 600, color: '#bbbcbc'}}>@{admin.userName}</span>
                        </div>
                </div>
                    )
                })}
                {
                    members?.slice(1, 4).map((member) => {
                        return (
                            <div className='s_profile'>
                                <img style={{width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover'}} src = {member.imgUrl}/>
                                <div >
                                    <span style={{fontWeight: 600, }}>{member.userName}</span>
                                    <span style={{fontWeight: 600, color: '#bbbcbc'}}>@{member.userName}</span>
                                </div>
                             </div>
                        )
                    })
                }
                
            </div>
        </div>
 
        <AdminEdit community = {community} show={show} toggle = {setShow}/>
    </div>
  )
}

export default SpaceSideBar