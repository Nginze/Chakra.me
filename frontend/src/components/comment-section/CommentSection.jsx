import axios from 'axios'
import {React, useContext, useState} from 'react'
import { userContext } from '../../contexts/UserContext'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentSection = ({post, comments, toggle}) => {
   
  const {data:user} = useContext(userContext)
  return (
    <>
        <CommentForm toggle = {toggle} user = {user} post = {post}/>
        {
          comments.length == 0
                          &&
                          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
                            <span style={{color: '#e0e0e3'}} class="iconify" data-icon="bxs:archive" data-width="32"></span>
                            <span style={{fontSize: '13px'}}>Be the first one to comment!</span>
                          </div>
        }
        {comments && comments.map((comment) => {
             
              return <Comment toggle = {toggle} user = {user}  comment = {comment}/>
        })}
    </> 
  )
}

export default CommentSection