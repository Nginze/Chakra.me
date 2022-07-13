import {React, useContext, useState} from 'react'
import Section from './Section'
import axios from 'axios'
import { userContext } from '../../contexts/UserContext'
import {useQuery} from 'react-query'
import '../../styles/BetaMessage.css'
import { Cursor } from 'mongoose'
import PCreate from './Pcreate'
const R_Sidebar = () => {

  const {data:user} = useContext(userContext)
  const [showPostModal, setShowPostModal] = useState(false)
  const [increaseIndex, setIndex] = useState(false)
  const [isForPost, setIsForPost] = useState(true)
  const getActivity = async () => {
    const activities = await axios({method: 'get',url: `http://localhost:5000/notification/${user._id}`,withCredentials: true})  
    return activities.data
  }

  const getSuggestions = async () => {
    const suggestions = await axios({method: 'get',url: `http://localhost:5000/suggestion`,withCredentials: true})  
    return suggestions.data
  }

  const {data: activity, isLoading: a_loading} = useQuery('activity', getActivity, {
    enabled: !!user
  })

  const {data: suggestions, isLoading: s_loading} = useQuery('suggestions', getSuggestions, {
    enabled: !!user
  })



 
  return (
    <div id={increaseIndex? 'increaseIndex': ''} style={{width: 'auto',paddingBottom: '3rem' }}>
        {/* <Section title={'Activity'} type = {'activity'} data = {activity} isLoading= {a_loading}/> */}
        <div className='beta-message-container'>
          <span className='beta-message-title'><span class="iconify" data-icon="file-icons:test-generic" data-width="20"></span> Beta warning!</span>
          <span className='beta-message-sub'>Chakra is still in its beta phase, things might break, handle us with care</span>
        </div>
        <div style={{padding: 0}} id = 'section-not-sticky'>
            <img style={{width: '100%'}} src='https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png'/>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '0 10px'}}>
              <span style={{display: 'flex', alignItems: 'flex-end', marginBottom: '1rem'}}>
                <img src="https://img.icons8.com/ultraviolet/60/000000/futurama-bender--v1.png"/>
                <span style={{fontWeight: '500'}}>Home</span> 
              </span>
              
              <span style={{fontSize: '13px', marginBottom: '1rem'}}>
                  Your personal Chakra frontpage. Come here to check in with your favorite communities.
              </span>
              <button
              onClick={
                () =>{ setIsForPost(true);setShowPostModal(true); setIndex(true)}
              }
              style={{
                border:'none',
                backgroundColor: '#2276ff',
                padding: '10px',
                color: 'white',
                borderRadius: '1000px',
                marginBottom: '0.875rem',
                cursor: 'pointer'
              }}
              >Create Post</button>
              <button
              onClick={
                () => {setIsForPost(false);setShowPostModal(true); setIndex(true); console.log(isForPost) }
              }
              style={{
                border:'1px solid #2276ff',
                backgroundColor: 'white',
                padding: '10px',
                color: '#2276ff',
                borderRadius: '1000px',
                marginBottom: '0.875rem',
                cursor: 'pointer'
              }}
              
              >Create Space</button>
            </div>
        </div>
        <PCreate show={showPostModal} toggle = {setShowPostModal} post={isForPost} reduceIndex = {setIndex}/>
        <Section title={'Suggested People'} type = {'suggestions'} data = {suggestions} isLoading = {s_loading}/>
    </div>
  )
}

export default R_Sidebar