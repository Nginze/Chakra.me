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
  
            if (lastPage.data.posts.length >= 10) return lastPage?.data.cursor;
            return undefined;
        }
    })



   
   
    
 
  
    
    
  return (
    <div>
        <Hero isAdmin = {isAdmin} community = {community}/>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '60vw', margin: 'auto',  marginTop: '3rem'}} className='space-content'>
            <div>
            <Feed isLoading={p_loading} posts={posts?.pages} refetch = {refetch} setType = {setType} type = {type} hasNextPage = {hasNextPage} fetchNextPage = {fetchNextPage} />
                {
                  posts?.pages[0]?.data?.posts.length == 0 &&
                  <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection:'column'}}>
                    <img style={{width: '100px', height: '100px', marginBottom: '4px'}} src='https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png'/>
                    <span style={{fontSize: '15px', color: '#636466'}}>This community hasn't shared, answered or posted anything yet.</span>
                  </div>
                }
            </div>
           
           <SpaceSideBar community = {community} isAdmin = {isAdmin} admins={community?.admins} members = {community?.members}/>
        </div>
    </div>
  )
}

export default Spaces