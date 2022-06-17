import {React, useContext, useState} from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/SpaceSideBar.css'
import AdminEdit from './AdminEdit'

const SpaceSideBar = ({admins, members, isAdmin, community}) => {
    const [show, setShow] = useState(false)
    
  return (
    <div id='space-side-bar'>
        <div id='m-section'>
            <div className='m-header'>
                <span style={{fontWeight: '500'}}>{members?.length} Members</span>
                <button className=''>See All</button>
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
        <div id = 'd-section'>
            <div className='d-header'>
                <span style={{fontWeight: '500'}}>Details {isAdmin && <i onClick={() => setShow(!show)} style = {{marginLeft: '0.4rem', cursor: 'pointer'}}class="fa-solid fa-pen"></i>}</span>
            </div>
            <div style={{textAlign: 'left'}} className='d-container'>
                    {community?.communityGuidelines}
            </div>
        </div>
        <AdminEdit community = {community} show={show} toggle = {setShow}/>
    </div>
  )
}

export default SpaceSideBar