import moment from 'moment'
import {React, useContext, useState} from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/SpaceSideBar.css'
import PCreate from '../homepage/Pcreate'
import AdminEdit from './AdminEdit'
import Rule from './Rule'
import RuleModal from './RuleModal'

const SpaceSideBar = ({admins, members, isAdmin, community}) => {
    const [show, setShow] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)
    const [showRulesModal, setShowRulesModal] = useState(false)
  return (
    <div id='space-side-bar'>
        <div id = 'd-section'>
            <div className='d-header'>
                <span style={{fontWeight: '500'}}> About Community {isAdmin && <i onClick={() => setShow(!show)} style = {{marginLeft: '0.4rem', cursor: 'pointer'}}class="fa-solid fa-pen"></i>}</span>
            </div>
            <div style={{textAlign: 'left', fontSize: '15px'}} className='d-container'>
                <div className='d-desc'>
                        {community?.communityDesc}
                </div>
                <div className='d-stats'>
                    <span className='d-stat'>
                        <span>{community?.members?.length}</span>
                        <span>Members</span>
                    </span>
                     <span className='d-stat'>
                        <span>0</span>
                        <span>Members Online</span>
                    </span>
                </div>
                <div className='d-cta'>
                   <span style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '0.4rem'}} class="iconify" data-icon="fluent:food-cake-12-regular" data-width="15"></span>
                        Created {moment(community?.timeStamp).format('MMMM Do YYYY')}
                   </span> 
                   <button
                   onClick={() => setShowPostModal(true)}
                   >
                    Create Post
                   </button>
                </div>
            </div>
        </div>

        <div id = 'd-section'>
            <div className='d-header'>
                <span style={{fontWeight: '500'}}> {community?.communityName}'s Rules {isAdmin && <i onClick={() => setShowRulesModal(!show)} style = {{marginLeft: '0.4rem', cursor: 'pointer'}}class="fa-solid fa-pen"></i>}</span>
            </div>
            <div style={{textAlign: 'left', fontSize: '15px'}} className='d-container'>
                    {
                        community?.communityRules.map((rule) => {
                            return <Rule rule = {rule.rule} description = {rule.description}/>
                        })
                    } 
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
        <RuleModal show={showRulesModal} toggle = {setShowRulesModal} community = {community}/>
        <PCreate show={showPostModal} toggle = {setShowPostModal}/>
        <AdminEdit community = {community} show={show} toggle = {setShow}/>
    </div>
  )
}

export default SpaceSideBar