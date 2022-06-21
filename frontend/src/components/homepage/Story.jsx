import React from 'react'
import '../../styles/Story.css'

const Story = ({toggle}) => {
  return (
    <div id = 'story'>
        <button onClick={() => toggle(true)} style={{border: '3px solid #bdc2cc'}} className='story-btn'>
            <img src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg'/>
            <i style={{color: 'rgb(33, 118, 255)', backgroundColor: 'white'}} className="fa-solid fa-circle-plus"></i>
            <span>Your Story</span>
        </button>
        <div className='story-inbox'>
            <button className='story-btn'>
                <img src='https://images.pexels.com/photos/3760733/pexels-photo-3760733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                <span>Phidelia</span>
            </button>
            <button className='story-btn'>
                <img src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                <span>Tom</span>
            </button>
            <button className='story-btn'>
                <img src='https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                <span>Jake</span>
            </button>
            <button className='story-btn'>
                <img src='https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                <span>hannah</span>
            </button>
        </div>
    </div>
  )
}

export default Story