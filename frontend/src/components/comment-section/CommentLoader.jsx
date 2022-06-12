import React from 'react'
import '../../styles/CommentLoader.css'

const CommentLoader = () => {
  return (
    <div id='comment-loader'>
       <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default CommentLoader