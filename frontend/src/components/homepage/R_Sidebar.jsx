import {React, useContext} from 'react'
import Section from './Section'
import axios from 'axios'
import { userContext } from '../../contexts/UserContext'
import {useQuery} from 'react-query'
const R_Sidebar = () => {
  const {data:user} = useContext(userContext)
  const getActivity = async () => {
    const activities = await axios({method: 'get',url: `http://localhost:5000/notification/${user._id}`,withCredentials: true})  
    return activities.data
  }

  const {data} = useQuery('activity', getActivity)

 


  return (
    <div style={{width: '100%', marginLeft: '3rem'}}>
        <Section title={'Activity'} isActivity = {true} activities = {data}/>
        <Section title={'Suggested People'} isActivity = {false}/>
    </div>
  )
}

export default R_Sidebar