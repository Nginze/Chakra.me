import moment from 'moment'
import {React, useContext} from 'react'
import { userContext } from '../../contexts/UserContext'

const A_Profile = ({data}) => {
  const {data:user} = useContext(userContext)
  return (
    <div className='s_profile'>
        <img style={{width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover'}} src = {data?.causerId?.imgUrl}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '8rem'}} >
            <span style={{fontWeight: 600, textAlign: 'left' }}>{ data?.causerId?.userName} <span style={{fontColor: 'black', fontWeight: 300}}>{data?.message} <span>{moment(data?.timeStamp).fromNow()}</span></span></span>
            
        </div>
    </div>
  )
}

export default A_Profile