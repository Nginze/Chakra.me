import {React, useContext} from 'react'
import Section from './Section'
import axios from 'axios'
import { userContext } from '../../contexts/UserContext'
import {useQuery} from 'react-query'
import '../../styles/BetaMessage.css'
const R_Sidebar = () => {

  const {data:user} = useContext(userContext)

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
    <div style={{width: 'auto',paddingBottom: '3rem', }}>
        {/* <Section title={'Activity'} type = {'activity'} data = {activity} isLoading= {a_loading}/> */}
        <div className='beta-message-container'>
          <span className='beta-message-title'><span class="iconify" data-icon="file-icons:test-generic" data-width="20"></span> Beta warning!</span>
          <span className='beta-message-sub'>Chakra is still in its beta phase, things might break, handle us with care</span>
        </div>
        <Section title={'Suggested People'} type = {'suggestions'} data = {suggestions} isLoading = {s_loading}/>
    </div>
  )
}

export default R_Sidebar