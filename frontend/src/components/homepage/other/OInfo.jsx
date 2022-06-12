import React from 'react'
import ContentLoader from 'react-content-loader'
import axios from 'axios'
import { getUser } from '../../../helpers'
import { useQuery } from 'react-query'

const OInfo = ({user}) => {

  const {data:follower} = useQuery('user', getUser)
  const submitFollow = async () => {
    console.log('clicked')
    await axios({
      method:'post',
      url: 'http://localhost:5000/user/follow',
      withCredentials: true,
      data:{
          userId: user._id,
          followerId: follower._id
      }
    })
  }
  return (
    user ? <div id = 'p-info'>
        <div className='p-meta-container'>
            <img id = 'p-img' src={user.imgUrl}/>
            <div className='p-meta'>
              
                <h2 className='p-meta-name'>{user.userName} <span onClick={submitFollow} className='follow-btn'>Follow</span></h2>
                
                <div className='p-meta-stats'>
                    <span> {user.posts.length} posts </span>
                    <span> {user.followers.length} followers </span>
                    <span> {user.following.length} following </span>
                </div>
                <p className='p-bio'>
                    I'm just a guy man bro!!
                </p>
            </div>
        </div>
        <div className='rule'></div>
    </div>
    :       <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={200}
    backgroundColor="transparent"
  
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
  )
}

export default OInfo