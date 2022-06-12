import axios from 'axios';
import {React, useState, useEffect} from 'react'
import '../../styles/Comment.css'
import CommentLoader from './CommentLoader';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import moment from 'moment';

const Comment = ({user, comment, toggle}) => {
    const [likes, setLikes] = useState(comment.upvotes.length);
    const [liked, setLiked] = useState(user ? comment.upvotes.includes(user._id): false);
    const [showForm, setShowForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [loading, setLoading] = useState(false)
    
    const [replies, setReplies] = useState(null)

    const likeComment = () => {

      setLikes(likes + 1)
      setLiked(true)
      axios({
        method:'post',
        url: `http://localhost:5000/comment/like/c/${comment._id}`,
        withCredentials: true,
        data:{
           
            userId: user._id
        }
       })
    }

    const getReplies = () => {

        if(!replies)
        {
          setLoading(true)
        }

        axios({
        method: 'get',
        url: `http://localhost:5000/comment/r/${comment._id}`,
        withCredentials: true,
        })
        .then(response => {setReplies(response.data); setLoading(false)})
        .catch(err => {console.log(err)})
        
      }

  return (
    <div id='comment' className='animate__animated animate__fadeIn animate__faster'>
        <div className='post-info'>
              <img className='post-profile-img' src={comment.userImg}/>
              <div className='post-profile-info'>
                <div>
                    <span className='profile-author'>{comment.userName}</span>
                    <span className='seperator'>·</span>
                    <span className='profile-time'>{moment(comment.timeStamp).fromNow()}</span>
                </div>
                <div className='comment-content'>
                    <p className='comment-text'>{comment.message}</p>
                    <div className='comment-engagement'>
                         { !liked ? <button onClick={ () => {setLiked(true);likeComment()}}><span class="iconify liked" data-icon="mdi:arrow-up-bold-outline"></span></button> : <span id = 'like-fill' class="iconify animate__animated animate__jackInTheBox animate__faster" data-icon="mdi:arrow-up-bold"></span>}
                         <button><span className={!liked ? 'comment-stats' : 'comment-stats liked animate__animated  animate__flipInY'}>{likes}</span></button>
                         <button onClick={() => {setShowForm(!showForm); setShowReplies(true);  getReplies()}} id='reply'><span class="iconify" data-icon="bi:reply"></span></button>
                    </div>
                </div>
                {!showReplies ? <button onClick={() => {setShowReplies(true); getReplies()}} className='view-replies'> View Replies</button> : <button onClick={() => {setShowReplies(false);setShowForm(false)}} className='view-replies'>Hide Replies</button>}
               
              </div>
        </div>
        {showForm && <ReplyForm disableForm = {setShowForm} toggle = {getReplies} parent={comment}/>}
       {showReplies && <div className='replies-container'>
           {replies && replies.map((reply) => {
              return <Reply  user = {user} reply = {reply}/>
           })}
          {loading && <div id='reply-loader'><CommentLoader/></div>}
        </div>}
       
    </div>
  )
}

export default Comment