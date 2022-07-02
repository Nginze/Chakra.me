import React, { useState, useContext } from 'react'
import { userContext } from '../../contexts/UserContext'
import '../../styles/Story.css'
import BannerPreview from '../spaces/BannerPreview'
import StoryModal from './StoryModal'
import StoryPreview from './StoryPreview'
import Carousel, {slidesToShowPlugin, slidesToScrollPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useQuery } from 'react-query'
import { getUser } from '../../helpers'
import axios from 'axios'


const Story = ({toggle, setStories}) => {
    const [show, setShow] = useState(false)
    const {data:user} = useContext(userContext)
    const [showPrev, setPrev] = useState(false)
    const [showNext, setNext] = useState(true)

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

    const setBtn = () => {
        setPrev(document.getElementById('str')?.scrollLeft != 0 )
    }

    const getUserStory = async () => {
        const result = await axios({method: 'get',url: `http://localhost:5000/story/${user._id}`,withCredentials: true})
        return result.data;
    }

    const {data: userStory} = useQuery("userStory", getUserStory, {
        enabled: !!user
    })

  return (

       
    <>
         
         <main class="main">
                <span  style={{cursor: 'pointer', display: 'flex'}} id = 'next' onClick={scrollNext}><i class="fa-solid fa-chevron-right"></i></span>
                <span className={`${ showPrev ? 'b-active':'not-active'}`} style={{cursor: 'pointer'}} id = 'prev' onClick={scrollPrev}><i class="fa-solid fa-chevron-left"></i></span>
                <section onScroll={setBtn} id='str' class="stories">
                    <div class="stories__item ">
                    <button 
                  
                  onClick={() => {setStories(userStory.stories.map((section) => {
		  
      	
                    if(!section?.includes('https://'))
                    {
                        return {
                            content: (props) => (
                                    <div style={{ background: 'pink', padding: 20, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>		
                                                        <h3 style={{ marginTop: 5, fontWeight: '600', fontSize: '1.6rem' }}>{section}</h3>
                                    </div>
                            )
                        }
                    }
                    return section
                }));toggle(true)}}
                    
                    
                    
                    
                        
                    >
                        <div class="stories__item-picture">
                        <img src={user?.imgUrl} alt="gail_pena's profile picture"/>
                        </div>
                        <i onClick={() => setShow(true)} style={{color: 'rgb(33, 118, 255)', backgroundColor: 'white'}} className="fa-solid fa-circle-plus"></i>
                        <span class="stories__item-username">Your Story</span>
                    </button>
                    </div>
                   
                  

                {    
                                user?.storyInbox
                                    .map((story) => {
                                    return (

                                    <div className='stories__item stories__item--active'>
                                        <button  onClick={() => {setStories(story.stories.map((section) => {
		  
      	
          if(!section?.includes('https://'))
          {
              return {
                  content: (props) => (
                          <div style={{ background: 'pink', padding: 20, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>		
                                              <h3 style={{ marginTop: 5, fontWeight: '600', fontSize: '1.6rem' }}>{section}</h3>
                          </div>
                  )
              }
          }
          return section
      }));toggle(true)}}>
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