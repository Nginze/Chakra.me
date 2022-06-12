
import axios from 'axios';
import {React, useState} from 'react'
import ReplyForm from './ReplyForm';


const Reply = ({user, reply}) => {

    const [likes, setLikes] = useState(reply.upvotes.length);
    const [liked, setLiked] = useState(user ? reply.upvotes.includes(user._id): false);
    const [showForm, setShowForm] = useState(false)

    const likeComment = () => {

       
        axios({
          method:'post',
          url: `http://localhost:5000/comment/like/c/${reply._id}`,
          withCredentials: true,
          data:{
             
              userId: user._id
          }
         })
      }
    
  return (
      <div id='reply' className='animate__animated animate__fadeIn animate__faster' >
            <div className='post-info'>
                <img className='post-profile-img' src={reply.userImg}/>
                <div className='post-profile-info'>
                    <div>
                        <span className='profile-author'>{reply.userName}</span>
                        <span className='seperator'>·</span>
                        <span className='profile-time'>7hrs</span>
                    </div>
                    <div className='comment-content'>
                        <p className='comment-text'>
                           {reply.message}
                        </p>
                        <div className='comment-engagement'>
                            { !liked ? <button onClick={ () => {setLiked(true); setLikes(likes + 1); likeComment()}}><span class="iconify liked" data-icon="mdi:arrow-up-bold-outline"></span></button> : <span id = 'like-fill' class="iconify animate__animated animate__jackInTheBox animate__faster" data-icon="mdi:arrow-up-bold"></span>}
                            <button><span className={!liked ? 'comment-stats' : 'comment-stats liked animate__animated  animate__flipInY'}>{likes}</span></button>
                            <button onClick={() => setShowForm(!showForm)} id='reply'><span class="iconify" data-icon="bi:reply"></span></button>
                        </div>
                    </div>
                    
                </div>
                
                
            </div>
            {showForm && <ReplyForm/>}
        </div>
  )
}

export default Reply