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
        {comments && comments.map((comment) => {
             
              return <Comment toggle = {toggle} user = {user}  comment = {comment}/>
        })}
    </> 
  )
}

export default CommentSection