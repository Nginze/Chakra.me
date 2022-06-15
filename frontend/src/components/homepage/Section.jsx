import React from 'react'
import '../../styles/Section.css'
import A_Profile from './A_Profile'
import S_Profile from './S_Profile'

const Section = ({title, isActivity, activities, suggestions, isLoading}) => {
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
            {activities ? activities?.map((activity) => {
                return isActivity?  <A_Profile data = {activity}/>  : <S_Profile/>
            }) : suggestions?.map((suggestion) => { 
                return isActivity?  <A_Profile />  : <S_Profile suggestion = {suggestion}/>
            })}
           
        </div>
    </div>
  )
}

export default Section