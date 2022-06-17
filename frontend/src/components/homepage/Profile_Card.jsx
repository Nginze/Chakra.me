import axios from 'axios'
import {React, useState} from 'react'
import { useQuery } from 'react-query'
import ClipLoader from "react-spinners/ClipLoader";

const Profile_Card = ({userId}) => {
  const [loading, setLoading] = useState(false)
  const getProfile = async(userId) => {

    const profile = await axios({
        method:'get',
        url: `http://localhost:5000/user/${userId}`,
        withCredentials: true
    })
 
    return profile.data
  }


  const {data: profile} = useQuery(['profile-card', userId], ()  =>  {return getProfile(userId)})

  return (
    <>
        <div style={{ backgroundColor: 'white', padding: '1rem'}} className='profile-card animate__animated animate__zoomIn animate__faster'>
            <div style={{display: 'flex', alignItems: 'center', }}>
                <img className='post-profile-img' src={profile?.imgUrl}/>
                <div className='post-profile-info'>
                    <span  className='profile-author'>{profile?.userName}</span>
                </div>
            </div>
            <div  style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', padding: '0.5rem'}}>
            <span style={{marginBottom : '0.4rem'}}><i style={{color: '#707173'}} class="fa-solid fa-envelope-open-text"><span  style={{marginRight: '0.4rem', marginLeft: '0.4rem'}}>•</span></i>{profile?.posts.length} Posts </span>
            <span style={{marginBottom : '0.4rem'}}><i style={{color: '#707173'}} class="fa-solid fa-user-group"></i><span  style={{marginRight: '0.4rem', marginLeft: '0.4rem'}}>•</span>{profile?.followers.length} Followers</span>
            <span style={{marginBottom : '0.4rem'}}><i style={{color: '#707173'}} class="fa-solid fa-people-group"></i><span  style={{marginRight: '0.4rem', marginLeft: '0.4rem'}}>•</span>{profile?.following.length} Following</span>
            </div>
            <div style={{width: '100%'}}>
                 <button style={{width: '100%', padding: '8px 5px', border: 'none', borderRadius: '15px', color: 'white', backgroundColor: '#2e69ff'}} className='post-btn'>
                    {!loading ? <span>Follow</span>  :  <ClipLoader color={'white'} loading={loading}  size={10} />}
                </button>
            </div>
        </div>
    </>
  )
}

export default Profile_Card