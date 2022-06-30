import React, { useState, useContext } from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/Story.css'
import BannerPreview from '../spaces/BannerPreview'
import StoryModal from './StoryModal'
import StoryPreview from './StoryPreview'
import Carousel, {slidesToShowPlugin, slidesToScrollPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


const Story = ({toggle, setStories}) => {
    const [show, setShow] = useState(false)
    const {data:user} = useContext(userContext)

    const scrollNext = () => {
        document.getElementById('next').addEventListener('click', () => {
            document.getElementById('str').scrollTo(document.getElementById('str').scrollLeft  + 200,0)
        });
    }

    const scrollPrev = () => {
        document.getElementById('prev').addEventListener('click', () => {
            document.getElementById('str').scrollTo(document.getElementById('str').scrollLeft  - 200,0)
        });
    }

  return (

       
    <>
         
         <main class="main">
                <span style={{cursor: 'pointer'}} id = 'next' onClick={scrollNext}><i class="fa-solid fa-circle-chevron-right"></i></span>
                <span style={{cursor: 'pointer'}} id = 'prev' onClick={scrollPrev}><i class="fa-solid fa-circle-chevron-left"></i></span>
                <section id='str' class="stories">
                    <div class="stories__item stories__item--active">
                    <button>
                        <div class="stories__item-picture">
                        <img src={user?.imgUrl} alt="gail_pena's profile picture"/>
                        </div>
                        <i onClick={() => setShow(true)} style={{color: 'rgb(33, 118, 255)', backgroundColor: 'white'}} className="fa-solid fa-circle-plus"></i>
                        <span class="stories__item-username">Your Story</span>
                    </button>
                    </div>
                  

                {    
                                user?.storyInbox.map((story) => {
                                    return (

                                    <div className='stories__item'>
                                        <button  onClick={() => {setStories(story.imageUrls);toggle(true)}}>
                                            <div class="stories__item-picture">
                                                <img src={story.userId.imgUrl} alt="gail_pena's profile picture"/>
                                            </div>
                                            <span class="stories__item-username">{story.userId.userName}</span>
                                        </button>
                                            
                                    </div>
                                    )
                                
                                    
                                })
                }
                </section>
        </main>
        
        <StoryPreview showBanner={show} toggle = {setShow}/>
    </>
  )
}

export default Story