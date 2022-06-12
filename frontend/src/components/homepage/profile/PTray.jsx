import {React, useState, useContext, useEffect} from 'react'
import Feed from '../Feed'
import Post from '../Post'
import '../../../styles/PTray.css'
import axios from 'axios'
import { userContext } from '../../../contexts/UserContext'
import { useQuery } from 'react-query'
import {getUser} from '../../../helpers'


const PTray = () => {
  const [postActive, setPostActive] = useState(true)
  const {data: user, isLoading} = useQuery('user', getUser)

  
  return (
    <div id = 'p-tray'>
        <div className='p-tray-head'>
            
           
            <button onClick={() => setPostActive(true)} className={!postActive ? 'p-btn' : 'p-btn t-active'}>
              <i class="fi fi-rs-apps"></i><span>Posts</span>
              {postActive && <div className='p-underline'></div>}
            </button>
            <button onClick={() => setPostActive(false)} className={postActive ? 's-btn' : 's-btn t-active'}>
              <i class="fi fi-rs-bookmark"></i><span>Saved</span>
              {!postActive && <div className='s-underline'></div>}
            </button>
            
        </div>
        <div className='p-tray-content'>
           
            <Feed isLoading={isLoading} posts = {user?.posts}/>

        </div>
    </div>
  )
}

export default PTray