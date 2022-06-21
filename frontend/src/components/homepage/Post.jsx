import {React, useState, useContext, useEffect} from 'react'
import 'animate.css';
import '../../styles/Post.css'
import CommentSection from '../comment-section/CommentSection';
import moment from 'moment';
import axios from 'axios'
import { userContext } from '../../contexts/UserContext';
import CommentLoader from '../comment-section/CommentLoader';
import PInfo from './profile/PInfo';
import Profile_Card from './Profile_Card';



const Post = ({post}) => {
  const [likes, setLikes] = useState(post?.upvotes?.length);
  const [showComments , setShowComments] = useState(false)
  const [loading, setLoading] = useState(false)
  const {data:user} = useContext(userContext)
  const [liked, setLiked] = useState( user ? post?.upvotes?.includes(user._id): false);
  const [comments, setComments] = useState(null)

  const getComments = () => {

    if(!comments)
    {
      setLoading(true)
    }
   
    axios({
    method: 'get',
    url: `http://localhost:5000/comment/${post._id}`,
    withCredentials: true,
    })
    .then(response => {setComments(response.data);setLoading(false); console.log('getcomments called')})
    .catch(err => {console.log(err)})
    
  }
  const likePost = () => {

    setLikes(likes + 1)
    setLiked(true)
    axios({
      method:'post',
      url: `http://localhost:5000/post/like/${post._id}`,
      withCredentials: true,
      data:{
          postId: post._id,
          userId: user._id
      }
     }).then(createNotfication(`liked your post`))
  }

  const createNotfication = (message) => {
    axios({
      method:'post',
      url: `http://localhost:5000/notification`,
      withCredentials: true,
      data:{
          postId: post._id,
          userId: post.userId,
          causerId: user._id,
          message: message
      }
     })
  }

  return (
    post && <>
    <div className='post-container'>
        <div style={{cursor: 'pointer'}} className='post-info'>
              <img className='post-profile-img' src={post.userImg}/>
              <div className='post-profile-info-container'>
                <div className='post-profile-info'>
                  <span className='profile-author'>{post.userName}</span>
                  <span className='profile-time'>{moment(post.timeStamp).fromNow().replace(' days', 'd').replace(' minutes', 'm')}</span>
                </div>
                <div>
                   <i class="fa-solid fa-ellipsis"></i>
                </div>
              </div>
             {/* <Profile_Card userId={post.userId}/> */}
        </div>
        <div className='post-content-text'>{post.message}</div>
        <img className='post-content-img' src={post.imgUrl}/>

        <div className='post-engagement'>
          <div className='interactions'>
            <div className='voting'>
               { !liked ? <button onClick={likePost}><span class="iconify liked" data-icon="mdi:arrow-up-bold-outline"></span></button> : <span id = 'like-fill' class="iconify animate__animated animate__jackInTheBox animate__faster" data-icon="mdi:arrow-up-bold"></span>}
                
                <button><span className={!liked ? 'voting-stats' : 'voting-stats liked animate__animated  animate__flipInY'}>{likes}</span></button>
                <button><span class="iconify" data-icon="mdi:arrow-down-bold-outline"></span></button>
            </div>
            <div className='commenting'>
                <span class="iconify" data-icon="et:refresh"></span>
                <span className = "sharing-stats"> 80 </span>
            </div>
            <div  className = "sharing">
                <div  onClick={() => {setShowComments(!showComments);getComments()}}><span class="iconify" data-icon="ic:outline-mode-comment"></span></div>
                <span className='commenting-stats'> {comments?.length} </span>
            </div>
            
            
          </div>
        </div>
        {showComments && comments &&  <CommentSection toggle = {getComments} post = {post} comments = {comments} /> }
        {loading && <CommentLoader/>}
    </div>
    
  </>
    )
  }

  export default Post