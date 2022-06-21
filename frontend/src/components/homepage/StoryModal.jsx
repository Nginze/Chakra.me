import React from 'react'
import Stories from 'react-insta-stories';
import '../../styles/StoryModal.css'

const StoryModal = ({show, toggle}) => {
    const stories = [
        'https://images.pexels.com/photos/11491782/pexels-photo-11491782.jpeg',
        'https://images.pexels.com/photos/4221068/pexels-photo-4221068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ]
   
    
  return (
    show && <div className = 'story-container'>
        <div id='str-logo' className='logo'>Chakra.me</div>
        <span onClick={() => toggle(false)} id = 'str-close'class="close">&times;</span>
        <Stories
			stories={stories}
			defaultInterval={3500}
			width={370}
			height={700}
            storyContainerStyles ={{zIndex: '20001', borderRadius: '15px', marginBottom: '20rem'}}
		/>
       
        <div id='str-background' className='modal-background'></div>
    </div>
  )
}

export default StoryModal