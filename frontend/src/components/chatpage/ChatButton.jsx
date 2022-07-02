import React from 'react'
import '../../styles/ChatButton.css'

const ChatButton = () => {
  return (
    <div id='chat-button'>
        <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'/>
        <div className='user-meta'>
            <span >MaNie</span>
            <span>Active 4h ago</span>
        </div>
    </div>
  )
}

export default ChatButton