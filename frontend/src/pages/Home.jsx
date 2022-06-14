import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import { useQuery } from 'react-query'
import Feed from '../components/homepage/Feed'
import Pcreate from '../components/homepage/Pcreate'
import R_Sidebar from '../components/homepage/R_Sidebar'
import Sidebar from '../components/homepage/Sidebar'
import { postContext } from '../contexts/PostContext'
import '../styles/Home.css'


const Home = () => {
  
  const getPosts = async () => {
    const posts = await axios({method: 'get',url: 'http://localhost:5000/post',withCredentials: true})
    return posts
  }
  const {isLoading, data} = useQuery('posts', getPosts)


  return (
    <main className='home'>
        <Feed posts = {data?.data} isLoading = {isLoading}/>
        <Sidebar/>
        <R_Sidebar/>
    </main>
  )
}

export default Home