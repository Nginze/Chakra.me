import axios from 'axios'
import {React, useState} from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Feed from '../components/homepage/Feed'
import Hero from '../components/spaces/Hero'
import SpaceSideBar from '../components/spaces/SpaceSideBar'



const Spaces = () => {

    const {id} = useParams()
    const [type, setType] = useState('recent')
    const getCommunity = async () => {
        const community = await axios({method: 'get',url: `http://localhost:5000/community/${id}`,withCredentials: true})
        return community.data
    }
    const getPosts = async (type) => {
        const posts = await axios({method: 'get',url: `http://localhost:5000/community/post/${id}?sort=${type}`,withCredentials: true})
        return posts.data
    }

    const {isLoading: c_loading, data: community} = useQuery('community', getCommunity)

    const {isLoading: p_loading, data: posts, refetch} = useQuery(['communityPosts', type], () =>  {return getPosts(type)}, {
        enabled: !!community
    })
    
    
  return (
    <div>
        <Hero community = {community}/>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '60vw', margin: 'auto',  marginTop: '3rem'}} className='space-content'>
            <Feed isLoading={p_loading} posts={posts} refetch = {refetch} setType = {setType} type = {type} />
           <SpaceSideBar admins={community?.admins} members = {community?.members}/>
        </div>
    </div>
  )
}

export default Spaces