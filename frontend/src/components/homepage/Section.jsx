import React from 'react'
import '../../styles/Section.css'
import A_Profile from './A_Profile'
import S_Profile from './S_Profile'

const Section = ({title, isActivity, activities}) => {
  return (
    <div id = 'section'>
        <div className='s_header'>
            <h2>{title}</h2>
            <button>See All</button>
        </div>
        <div className='s_container'>
            {activities?.map((activity) => {
                return isActivity?  <A_Profile data = {activity}/>  : <S_Profile/>
            })}
           
        </div>
    </div>
  )
}

export default Section