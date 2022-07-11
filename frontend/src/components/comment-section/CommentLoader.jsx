import React from 'react'
import ContentLoader from 'react-content-loader'
import '../../styles/CommentLoader.css'

const CommentLoader = () => {
  return (
    <div id='comment-loader'>
      <ContentLoader
          viewBox="0 0 400 200"
          height={60}
          width={'100%'}
          backgroundColor="transparent"
        
        >
          <circle cx="150" cy="86" r="8" />
          <circle cx="194" cy="86" r="8" />
          <circle cx="238" cy="86" r="8" />
        </ContentLoader>
    </div>
  )
}

export default CommentLoader