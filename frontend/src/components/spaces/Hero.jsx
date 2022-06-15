import React from 'react'
import '../../styles/Hero.css'

const Hero = () => {
  return (
    <div  style={{background: 'linear-gradient(189deg, rgba(255,248,248,1) 0%, rgba(116,116,116,1) 100%)'}} id = 'hero'>
        <div className='unblured-img' style={{backgroundImage : 'url(https://avatarfiles.alphacoders.com/313/313232.jpg)' , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <img src='https://avatarfiles.alphacoders.com/313/313232.jpg'/>
        </div>
        <div className='h_container'>
            <div className='h_desc'>
                <h3 style={{fontSize: '1.8rem'}}>Computer Science</h3>
                <p>We love technology and memes here</p>
                <div style={{color: '#b8bdc2',}}><span> 10 Members</span><span  style={{marginRight: '0.4rem', marginLeft: '0.4rem'}}>•</span><span style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: '0.3rem'}} class="iconify" data-icon="bi:graph-up-arrow" ></span> 9 posts in the last week</span></div>
            </div>
            <div className='h_cta'>
                <button className='h_settings'><span class="iconify" data-icon="cil:options" data-width="30" data-rotate="90deg"></span></button>
                <button style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} className = 'h_follow'> <span style={{marginRight: '0.4rem'}}  class="iconify" data-icon="tabler:layout-grid-add" data-width="20"></span><span>Follow Space</span></button>
            </div>
        </div>
    </div>
  )
}

export default Hero