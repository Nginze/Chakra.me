import moment from 'moment'
import {React, useContext} from 'react'
import '../../styles/A_Profile.css'
const A_Profile = ({data}) => {

  const timeMap = {
    minutes: 'm',
    days: 'd'
  }
  return (
    <div className='s_profile'>
        <img style={{width: '2.2rem', height: '2.2rem', borderRadius: '50%', objectFit: 'cover'}} src = {data?.causerId?.imgUrl}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '7rem'}} >
            <span className='not-content'  style={{fontWeight: 700, textAlign: 'left' }}>
                { data?.causerId?.userName} 
                <span style={{fontColor: 'black', fontWeight: 400, marginLeft: '0.2rem'}}>
                    {data?.message} 
                    <span style={{marginLeft: '0.2rem', color:'#b8bfcb'}}>
                      {moment(data?.timeStamp).fromNow(true).replace(' days', 'd').replace(' minutes', 'm')}
                    </span>
                </span>
            </span>
        </div>
        <div className='cta'> 
           <div>
              <i style={{color: '#2e69ff'}} class="fa-solid fa-user-plus"></i>
           </div>
        </div>
    </div>
  )
}

export default A_Profile