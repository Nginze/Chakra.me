import {React, useState} from 'react'
import '../../styles/CommentForm.css'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'


const CommentForm = ({user, post, toggle}) => {

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const createComment = () => {

    setLoading(true)
    axios({
      method:'post',
      url: 'http://localhost:5000/comment/',
      withCredentials: true,
      data:{
          message: message,
          userId: user._id,
          userImg: user.imgUrl,
          userName: user.userName,
          postId: post._id,
  
      }
    }).then((response) => {
      toggle()
      setLoading(false)
    })
  }
  return (
    <div id='comment-form'>
        <img src={user.imgUrl}/>
        <input value = {message} onChange = {(e) => setMessage(e.target.value)} placeholder='Add a comment...'/>
        <button onClick={createComment}>{!loading ? <span>Add Comment</span>  :  <ClipLoader color={'white'} loading={loading}  size={10} />}</button>
    </div>
  )
}

export default CommentForm