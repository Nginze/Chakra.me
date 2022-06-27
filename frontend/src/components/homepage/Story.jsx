import React, { useState, useContext } from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/Story.css'
import BannerPreview from '../spaces/BannerPreview'
import StoryModal from './StoryModal'
import StoryPreview from './StoryPreview'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Story = ({toggle, setStories}) => {
    const [show, setShow] = useState(false)
    const {data:user} = useContext(userContext)

  return (

       
    <div id='story'> 


     
    <div className='story-inbox'>
        <>
            <button style={{border: '3px solid #bdc2cc'}} className='story-btn'>
                <img onClick={() => toggle(true)} src={user?.imgUrl}/>
                <i onClick={() => setShow(true)} style={{color: 'rgb(33, 118, 255)', backgroundColor: 'white'}} className="fa-solid fa-circle-plus"></i>
                <span>Your Story</span>
            </button>
        </> 
        
        {
                
            user?.storyInbox.map((story) => {
                return(
                <>
            
                    <button onClick={() => {setStories(story.imageUrls);toggle(true)}} className='story-btn'>
                        <img src={story.userId.imgUrl}/>
                        <span>{story.userId.userName}</span>
                    </button>
                 
                   
                </>
                )
            })
        }
    </div>

        <StoryPreview showBanner={show} toggle = {setShow}/>
    </div>
  )
}

export default Story