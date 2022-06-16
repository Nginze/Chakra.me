import axios from 'axios'
import {React, useContext, useState, useEffect} from 'react'
import { userContext } from '../../contexts/UserContext'
import {find as _find} from 'lodash'
import '../../styles/Hero.css'
import { useQueryClient } from 'react-query'


const Hero = ({community}) => {
    const queryClient = useQueryClient()
    const {data:user} = useContext(userContext)
    const [joined, setJoined] = useState(community && user && _find(community.members, (member) => {return member._id == user._id}))
    const [show, setShow] = useState(false)

    const validate = async () => {
        const res = await axios({
            method: 'get',
            url: `http://localhost:5000/community/${community._id}/validate?user=${user._id}`,
            withCredentials: true,
        })

        setJoined(res.data.isMember)


    }
    const joinCommunity = async () => {
     
        await axios({
            method:'put',
            url: `http://localhost:5000/community/${community?._id}/join`,
            withCredentials: true,
            data:{
                userId: user?._id
            }
        }).then(() => {queryClient.invalidateQueries("community");validate()})

    }

    const leaveCommunity = async () => {
        await axios({
            method:'post',
            url: `http://localhost:5000/community/${community?._id}/leave`,
            withCredentials: true,
            data:{
                userId: user?._id
            }
        }).then(() => {queryClient.invalidateQueries("community");validate()})
        
        
    }

    useEffect(() => {
        community && user && validate()
    }, [community]);


  return (
    <div  style={{background: `url(${community?.communityBanner})`, backgroundSize: 'cover'}} id = 'hero'>
        <div className='unblured-img ' style={{backgroundImage : `url(${'https://res.cloudinary.com/chakra-me/image/upload/v1655306195/default_wallpaper_bcuctp.webp'})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
           <div className='container'>
                 <img style={{background: 'white'}} src={community?.communityIcon}/>
                <div class="overlay">
                    <div class="text"><i class="fa-solid fa-pen-to-square"></i></div>
                </div>
           </div>
        </div>
        <div className='h_container'>
            <div className='h_desc'>
                <h3 style={{fontSize: '1.8rem'}}>{community?.communityName}</h3>
                <p>{community?.communityDesc}</p>
                <div style={{color: '#b8bdc2',}}><span> {community?.members.length} Members</span><span  style={{marginRight: '0.4rem', marginLeft: '0.4rem'}}>•</span><span style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: '0.3rem'}} class="iconify" data-icon="bi:graph-up-arrow" ></span> 9 posts in the last week</span></div>
            </div>
            <div className='h_cta'>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} id = 'post-sorter'>
                     <button onClick={() => setShow(!show)} className='h_settings'><span class="iconify" data-icon="cil:options" data-width="30" data-rotate="90deg"></span></button>
                     <div style={{display: `${show? 'flex': 'none'}`, width: '140px', alignItems: 'flex-start'}} id = 'leave'className='options animate__animated animate__zoomIn animate__faster' >
                        <button onClick={leaveCommunity}>Leave Space<i style={{marginLeft: '0.5rem'}} class="fa-solid fa-arrow-right-from-bracket"></i></button>
                        <button style = {{ marginTop: '0.7rem'}} onClick={leaveCommunity}>Edit Banner<i style={{marginLeft: '0.5rem'}} class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
                {!joined && <button onClick={joinCommunity} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} className = 'h_follow'> <span style={{marginRight: '0.4rem'}}  class="iconify" data-icon="tabler:layout-grid-add" data-width="20"></span><span>Follow Space</span></button>}
                {joined && <div>
                                <button style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} className='h_followed'>Subscribed <i style={{marginLeft: '0.4rem' , color: 'white', fontSize: '1.3rem'}} class="fa-solid fa-circle-check"></i>
                                </button>
                           </div>}
            </div>
        </div>
    </div>
  )
}

export default Hero