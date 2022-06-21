import axios from 'axios'
import {React, useState, useContext, useEffect} from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Feed from '../components/homepage/Feed'
import Hero from '../components/spaces/Hero'
import SpaceSideBar from '../components/spaces/SpaceSideBar'
import { userContext } from '../contexts/UserContext'



const Spaces = () => {
    const {data: user } = useContext(userContext)
    const {id} = useParams()
    const [type, setType] = useState('recent')
    const [isAdmin, setIsAdmin] = useState(false)
    const getCommunity = async () => {
        const community = await axios({method: 'get',url: `http://localhost:5000/community/${id}`,withCredentials: true})
        return community.data
    }

    const getPosts = async (type, pageParam) => {
        const posts =  await axios({method: 'get',url: `http://localhost:5000/community/post/${id}?sort=${type}&page=${pageParam}`,withCredentials: true})
        return posts
    }

    const validate = async () => {
        const res = await axios({
            method: 'get',
            url: `http://localhost:5000/community/${community._id}/validate?user=${user._id}`,
            withCredentials: true,
        })

        setIsAdmin(res.data.isAdmin)


    }

    useEffect(() => {
        community && user && validate()
    })

    const {isLoading: c_loading, data: community} = useQuery('community', getCommunity)

    const {isLoading: p_loading,
            data: posts, 
            refetch, 
            hasNextPage,
            fetchNextPage} = useInfiniteQuery(['communityPosts', type], ({pageParam= 1}) =>  {return getPosts(type, pageParam)}, {
        // enabled: !!community,
        getNextPageParam: (lastPage) => {
    
            console.log(lastPage.data.posts.length >= 10)
            if (lastPage.data.posts.length >= 10) return lastPage?.data.cursor;
            return undefined;
        }
    })



   
   
    
 
  
    
    
  return (
    <div>
        <Hero isAdmin = {isAdmin} community = {community}/>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '60vw', margin: 'auto',  marginTop: '3rem'}} className='space-content'>
            <Feed isLoading={p_loading} posts={posts?.pages} refetch = {refetch} setType = {setType} type = {type} hasNextPage = {hasNextPage} fetchNextPage = {fetchNextPage} />
           <SpaceSideBar community = {community} isAdmin = {isAdmin} admins={community?.admins} members = {community?.members}/>
        </div>
    </div>
  )
}

export default Spaces