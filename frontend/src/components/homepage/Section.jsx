import React from 'react'
import '../../styles/Section.css'
import A_Profile from './A_Profile'
import S_Profile from './S_Profile'

const Section = ({title, type, data, isLoading}) => {
  return (
    <div id = 'section'>
        <div className='s_header'>
            <h2>{title}</h2>
            <button>See All</button>
        </div>
        <div className='s_container'>
            {isLoading && <div class="loadingio-spinner-spinner-2gw7yb8gxej"><div class="ldio-h3evnyucb7">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>}

            {type == 'activity' && 
            
                <div className='story-mentions-container'>
                    <span>Stories About You</span>
                    <A_Profile/>
                </div>
            }

            {type == 'activity' && <span className='opt-heading'>New</span> }

            {type == 'activity' ? data?.map((activity) => {

                return  <A_Profile data = {activity}/>

            }) : type == 'suggestions'? data?.map((suggestion) => { 

                return  <S_Profile data = {suggestion}/>

            }) : null}
           
        </div>
    </div>
  )
}

export default Section