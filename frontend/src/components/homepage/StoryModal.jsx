import React from 'react'
import Stories from 'react-insta-stories';
import '../../styles/StoryModal.css'

const StoryModal = ({show, toggle, stories}) => {


    
  return (
    show && <div className = 'story-container'>
        <div id='str-logo' className='logo'><img src="https://img.icons8.com/color/30/000000/naruto-sign.png"/>Chakra.me</div>
        <span onClick={() => toggle(false)} id = 'str-close'class="close">&times;</span>
        <Stories
			stories={stories}
			defaultInterval={3500}
			width={370}
			height={700}
            storyContainerStyles ={{zIndex: '20001', borderRadius: '15px', marginBottom: '20rem', zIndex: '200000'}}
		/>
       
        <div id='str-background' className='modal-background'></div>
    </div>
  )
}

export default StoryModal