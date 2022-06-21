import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import { useQuery, useInfiniteQuery} from 'react-query'
import Feed from '../components/homepage/Feed'
import Pcreate from '../components/homepage/Pcreate'
import R_Sidebar from '../components/homepage/R_Sidebar'
import Sidebar from '../components/homepage/Sidebar'
import Sorter from '../components/homepage/Sorter'
import { postContext } from '../contexts/PostContext'
import '../styles/Home.css'

const Home = () => {
  const [type, setType] = useState('recent')

  const getPosts = async (type, pageParam) => {
    const posts =  await axios({method: 'get',url: `http://localhost:5000/post/?sort=${type}&page=${pageParam}`,withCredentials: true})
   
    return posts
  }

  const {data,
        isLoading,
        isError,
        hasNextPage,
        refetch,
        fetchNextPage
        } = useInfiniteQuery(['posts', type], ({pageParam = 1}) =>{return getPosts(type, pageParam)}, {
            keepPreviousData: true,
            getNextPageParam: (lastPage) => {
    
              console.log(lastPage.data.posts.length >= 10)
              if (lastPage.data.posts.length >= 10) return lastPage?.data.cursor;
              return undefined;
            },
  })


  return (
    <main className='home'>
        <Feed posts = {data?.pages} isLoading = {isLoading} refetch = {refetch} setType = {setType} type = {type} hasNextPage = {hasNextPage} fetchNextPage = {fetchNextPage}/>
        <Sidebar/>
        <R_Sidebar/>
    </main>
  )
}

export default Home