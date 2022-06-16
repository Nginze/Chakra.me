import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import { useQuery } from 'react-query'
import Feed from '../components/homepage/Feed'
import Pcreate from '../components/homepage/Pcreate'
import R_Sidebar from '../components/homepage/R_Sidebar'
import Sidebar from '../components/homepage/Sidebar'
import Sorter from '../components/homepage/Sorter'
import { postContext } from '../contexts/PostContext'
import '../styles/Home.css'

const Home = () => {
  const [type, setType] = useState('recent')
  const getPosts = async (type) => {
    const posts =  await axios({method: 'get',url: `http://localhost:5000/post/?sort=${type}`,withCredentials: true})
    return posts
  }
  const {isLoading, data, refetch} = useQuery(['posts', type], () =>{return getPosts(type)}, {
      keepPreviousData: true
  })

  return (
    <main className='home'>
        <Feed posts = {data?.data} isLoading = {isLoading} refetch = {refetch} setType = {setType} type = {type}/>
        <Sidebar/>
        <R_Sidebar/>
    </main>
  )
}

export default Home