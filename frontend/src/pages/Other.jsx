import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import OInfo from '../components/homepage/other/OInfo'
import OTray from '../components/homepage/other/OTray'
import { usersContext } from '../contexts/UsersContext'
import { useQuery } from 'react-query'
import '../styles/Other.css'


const Other = () => {
  const {id, username} = useParams()
  // const [user, setUser] = useState()
  // const {progress, setProgress} = useContext(usersContext)
  // const [loading, setLoading] = useState(false)
  // const [posts, setPosts] = useState()


  const getUser = async (id) => {
   const user = await  axios({method: 'get',url: `http://localhost:5000/user/${id}`,withCredentials: true,})
   return user
  }
  const { isLoading, isError, data, error , refetch} = useQuery('other', () =>  getUser(id), )

  return (
    <div id='other'>
   
       <OInfo user = {data?.data} loading = {isLoading}/> 
       <OTray isLoading={isLoading} posts = {data?.data.posts}/>
    </div>
  )
}

export default Other