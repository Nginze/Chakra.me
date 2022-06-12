import axios from 'axios'
import {React, useState, useEffect} from 'react'
import ContentLoader from 'react-content-loader'
import Feed from '../Feed'


const OTray = ({isLoading, posts}) => {
 

  return (
    <div id = 'p-tray'>
    <div className='p-tray-head'>
        
       
        <button  className={'p-btn t-active'}>
          <i class="fi fi-rs-apps"></i><span>Posts</span>
          {<div className='p-underline'></div>}
        </button>
       
        
    </div>
    <div className='p-tray-content'>
       {<Feed isLoading={isLoading} posts = {posts}/>
       }

    </div>
    </div>
  )
}

export default OTray