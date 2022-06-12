import React from 'react'
import '../../../styles/EModal.css'
const EModal = ({show, toggle }) => {

  return (
  show && <>
    <div className='modal-background'></div>
    <div id='e-modal' className='animate__animated animate__fadeIn animate__faster'>
      <span onClick={() => toggle(false)} class="close">&times;</span>
     
      <div className='profile-section'>
          <div className='profile-elements'>
            <img className='profile-section-img' src='https://avatarfiles.alphacoders.com/310/thumb-31046.jpg'/>
            <div id='e-modal-meta' >
              <span className='profile-section-name'>Rager X</span>
              <button>Change profile picture</button>
            </div>
          </div>
          <div className='space-name'>
            <label>Username</label>
            <input/>
            <span>Enter your new prefered username</span>
          </div>
          <div className='space-description'>
            <label>Bio</label>
            <input/>
            <span>Include a few keywords to show people what you are all about</span>  
          </div>
        </div>
        <div className='modal-cta'>
          <button onClick={() => toggle(false)} className='cancel-btn'>Cancel</button>
          <button className='post-btn'>Save</button>
        </div>
    </div>
  </>
  )
}

export default EModal