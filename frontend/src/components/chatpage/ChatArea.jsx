import React from 'react'
import '../.././styles/ChatArea.css'
import ChatButton from './ChatButton'

const ChatArea = () => {
  return (
    <div id = 'chat-area'>
        <div className='chat-pane'>
            <div className='chat-pane-head'>
                <span>Rager X</span>
            </div>
            <div className='friends-container'>
                <ChatButton/>
                <ChatButton/>
                <ChatButton/>
           
            </div>
        </div>
        <div className='chat-container'>
            <div className='chat-container-heading'>
                <div id='chat-heading'>
                    <img style={{width: '1.7rem', height: '1.7rem'}} src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'/>
                    <div className='user-meta'>
                        <span >MaNie</span>
                        <span>Active 4h ago</span>
                    </div>
                </div>
            </div>
            <div className='message-area'>

            </div>
            <form>
                <button>Send</button>
                <input placeholder='Message...'/>
            </form>
        </div>
    </div>
  )
}

export default ChatArea