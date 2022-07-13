import React from 'react'
import '../../styles/Feed.css'
import Post from './Post'
import ContentLoader from "react-content-loader"
import Sorter from './Sorter'
import InfiniteScroll from "react-infinite-scroller";
import Story from './Story'
import FeedForm from './FeedForm'
import { useState } from 'react'


const Feed = ({isLoading, posts, refetch, setType, type,hasNextPage, fetchNextPage, toggle, setStories}) => {
  const [increaseIndex, setIndex] = useState(false)
  return (
    <div id= {increaseIndex? 'increaseIndex': ''} className='feed-container'>
        {(!window.location.pathname.includes('profile') && !window.location.pathname.includes('spaces')) && <Story increaseIndex = {setIndex} toggle={toggle} setStories = {setStories} />}
        <FeedForm increaseIndex = {setIndex}/>
        {posts && !window.location.pathname.includes('profile') && <Sorter refetch = {refetch} setType= {setType} type = {type} />}
        {!isLoading && window.location.pathname.includes('profile') && posts?.map((post) =>
              <Post post = {post}/>
              )}
        {!isLoading && fetchNextPage &&
        <InfiniteScroll style={{width: '100%'}}  hasMore={hasNextPage} loadMore={fetchNextPage} loader = {<div class="loadingio-spinner-spinner-2gw7yb8gxej" ><div class="ldio-h3evnyucb7">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div></div>}>
           
            {posts?.map((page) =>
              page.data.posts.map((post) => <Post post = {post}/>)
            )}
            {!hasNextPage && <p style={{paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <i style={{color: '#b3b4b4', marginRight: '0.5rem'}} class="fa-solid fa-flag"></i> There are no more posts to show right now</p>}
        </InfiniteScroll>
}
        
        
   
        {isLoading && [1,2,3,4,5].map((n) => 
        <ContentLoader 
        speed={2}
        width={'100%'}
        height={300}
        style = {{
          backgroundColor: 'white',
          boxShadogw:' rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
          marginBottom: "1rem",
          padding: '2rem'
        }}
        viewBox="0 0 400 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <rect x="0" y="180" rx="7" ry="7" width="169" height="19" />

        <circle cx="20" cy="20" r="20" />
      </ContentLoader>)}
    </div>
  )
}

export default Feed