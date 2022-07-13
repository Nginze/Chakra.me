import React from 'react'
import ContentShimmer, { ProfileShimmer } from 'react-content-shimmer'
import '../../styles/Section.css'
import A_Profile from './A_Profile'
import S_Profile from './S_Profile'

const Section = ({title, type, data, isLoading}) => {
  return (
    <div id = 'section'>
        <div className='s_header'>
            <h2>{title}</h2>
            {/* <button>See All</button> */}
        </div>
        <div className='s_container'>
           

             { 
               
                               !data &&
                    [1,2,3,4,].map((shimmer) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center', padding: '10px 10px'}}>
                                <ProfileShimmer style={{width: '56px', height: '56px'}}/>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <ContentShimmer style={{height: '15px', marginBottom: '0.5rem', width: '180px'}}/>
                                    <ContentShimmer style={{height: '15px', width: '120px'}}/>
                                </div>
                            </div>

                        )
                    })

                
            }

            {/* {type == 'activity' && 
            
                <div className='story-mentions-container'>
                    <span>Stories About You</span>
                    <A_Profile/>
                </div>
            } */}

            {type == 'activity' && <span className='opt-heading'>New</span> }

            {
                data?.length == 0 && <span  style={{display: 'flex',justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem'}}><i style={{marginRight: '0.5rem'}} className="fa-solid fa-bell"></i>No recent notifications</span>
            }

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