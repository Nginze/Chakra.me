import React from 'react'
import '../../styles/Feed.css'
import Post from './Post'
import ContentLoader from "react-content-loader"

const Feed = ({isLoading, posts}) => {
  return (
    <div className='feed-container'>
        {!isLoading ? posts.map((post) => <Post post = {post}/>)
        :[1,2,3,4,5].map((n) => 
        <ContentLoader 
        speed={2}
        width={520}
        height={300}
        style = {{
          backgroundColor: 'white',
          boxShadow:' rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
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