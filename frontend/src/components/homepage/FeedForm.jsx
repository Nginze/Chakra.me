import React from 'react'
import { useContext, useState} from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/FeedForm.css'

const FeedForm = () => {
  const {data: user} = useContext(userContext)
  const [showPostModal, setShowModal] = useState(false);
  return (
    <div id='feed-form'>
        <img src= {user?.imgUrl}/>
        <input placeholder='Create Post'/>
        <button>Post</button>
    </div>
  )
}

export default FeedForm