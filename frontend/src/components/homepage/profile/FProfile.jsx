import axios from 'axios'
import {React, useContext, useState} from 'react'
import { userContext } from '../../../contexts/UserContext'
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery, useQueryClient } from 'react-query';
import ContentShimmer, { ProfileShimmer } from 'react-content-shimmer';


const FProfile = ({data}) => {
    const {data: user} = useContext(userContext)
    const [fState, setFState] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const checkIsFollowing = async () => {
       
       const res =  await axios({
            method:'get',
            url: `http://localhost:5000/user/follow/${data?._id}/check/?user=${user?._id}`,
            withCredentials: true
          })
        setFState(res?.data.isFollowing)
        return res.data
      
    }
    const submitFollow = async () => {
        setLoading(true)
        await axios({
          method:'post',
          url: 'http://localhost:5000/user/follow',
          withCredentials: true,
          data:{
              userId: data?._id,
              followerId: user?._id
          }
        })
        queryClient.invalidateQueries(['following-state', data?._id])
        setLoading(false)

    }

    const {data:followingState} = useQuery(['following-state', data._id], checkIsFollowing)
  return (
    followingState ? 
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', paddingRight: '1rem'}} className='s_profile'>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img style={{width: '3.2rem', height: '3.2rem', borderRadius: '50%', objectFit: 'cover'}} src = {data?.imgUrl}/>
            <div style={{display: 'flex', flexDirection: 'column', width: '7rem'}} >
                <span  style={{fontWeight: '500', textAlign: 'left' }}>
                {data?.userName}
                </span>
                <span  style={{ textAlign: 'left' }}>
                @{data?.userName?.toLowerCase()}
                </span>
            </div>
        </div>
       { !followingState?.isFollowing ?<div onClick={submitFollow} style={{justifySelf: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='cta'> 
           <div style={{margin: '0'}}>
              {!isLoading ? <i style={{color: '#2e69ff'}} class="fa-solid fa-user-plus"></i> : <ClipLoader color={'white'} loading={isLoading}  size={10} />}
           </div>
        </div> :
        <div style={{justifySelf: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#c4c6c6'}} className='cta'> 
           <div style={{margin: '0'}}>
                <i style={{color: '#f7f7f8'}} class="fa-solid fa-user-check"></i>
           </div>
        </div> }
    </div> 
    :<div style={{display: 'flex', alignItems: 'center', padding: '5px 10px'}}>
          <ProfileShimmer style={{width: '56px', height: '56px'}}/>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <ContentShimmer style={{height: '15px', marginBottom: '0.5rem', width: '180px'}}/>
              <ContentShimmer style={{height: '15px', width: '120px'}}/>
          </div>
      </div>
  )
}

export default FProfile