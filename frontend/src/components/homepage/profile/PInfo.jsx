import {React, useState} from 'react'
import '../../../styles/PInfo.css'
import EModal from './EModal'

const PInfo = ({user}) => {
  const [EModalOpen, setEModalOpen] = useState(false)
  return (
    <div id = 'p-info'>
        { user && <div className='p-meta-container'>
            <img id = 'p-img' src={user.imgUrl}/>
            <div className='p-meta'>
              
                <h2 className='p-meta-name'>{user.userName} <i onClick={() => setEModalOpen(true)} class="fi fi-rs-settings"></i></h2>
                
                <div className='p-meta-stats'>
                    <span> {user.posts.length} posts </span>
                    <span> {user.followers.length} followers </span>
                    <span> {user.following.length} following </span>
                </div>
                <p className='p-bio'>TRACY❤️✨
                  God first❤🙏
                  ❣music lover💃♫
                  💙blue is the colour 😘
                  bestie @koffee.jnr 🤗❤</p>
            </div>
        </div>}
        <div className='rule'></div>
        <EModal show ={EModalOpen} toggle ={setEModalOpen}/>
    </div>
  )
}

export default PInfo