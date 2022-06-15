import React from 'react'

const S_Profile = ({suggestion}) => {
  return (
    <div className='s_profile'>
        <img style={{width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover'}} src = {suggestion?.imgUrl}/>
        <div >
            <span style={{fontWeight: 600, }}>{suggestion.userName}</span>
            <span style={{fontWeight: 600, color: '#bbbcbc'}}>@{suggestion.userName}</span>
        </div>
    </div>
  )
}

export default S_Profile