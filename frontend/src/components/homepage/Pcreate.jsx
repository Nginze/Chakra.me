import {React, useState, useContext} from 'react'
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertFromRaw, convertToRaw} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'animate.css';
import axios from 'axios';
import '../../styles/Pcreate.css'
import { userContext } from '../../contexts/UserContext';
import { postContext } from '../../contexts/PostContext';
import ClipLoader from "react-spinners/ClipLoader";
import { useQueryClient,  useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';


const PCreate = ({show, toggle , post}) => {
  const [postActive, setPostActive] = useState(post)
  const [fileInput, setFileInput] = useState('')
  const [previewSource, setPreviewSource] = useState(null)
  const [message, setMessage] = useState('')
  const {data:user}  = useContext(userContext)
  const [spaceName, setSpaceName] = useState(`${user?.userName}'s space`)
  const [spaceDesc, setSpaceDesc] = useState('')  
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  

  

  const handleFileInput = (e) => {

      const file = e.target.files[0]
      previewFile(file)
  }

  const handleSubmit = () => {
     setLoading(true)
     
     axios({
      method:'post',
      url: 'http://localhost:5000/post/',
      withCredentials: true,
      data:{
          message: message,
          userId: user._id,
          userImg: user.imgUrl,
          userName: user.userName,
          communityId: community?._id,
          imgbase64: previewSource
      }
    }).then((response) => {setLoading(false); toggle(false); queryClient.invalidateQueries("communityPosts");queryClient.invalidateQueries("posts")})
    
      


  }

  const previewFile = (file) => {

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
  }

  const createSpace = async() => {

      const {data} = await axios({
        method:'post',
        url: 'http://localhost:5000/community',
        withCredentials: true,
        data:{
            communityName: spaceName,
            communityDesc: spaceDesc,
            userId: user?._id,

        }
      })
      navigate(`/spaces/${data._id}`)
  }



  const getCommunity = async () => {
    const community = await axios({method: 'get',url: `http://localhost:5000/community/62a9ff02240373680cb6ba04`,withCredentials: true})
    return community.data
  }

  const {isLoading: c_loading, data: community} = useQuery('community', getCommunity, {
    enabled: false
  })
  return (
    show && <>
      <div className='modal-background'></div>
      <div className='create-modal-container animate__animated animate__fadeIn animate__faster'>
        <div className='modal-head'>
          <span onClick={() => toggle(false)} class="close">&times;</span>
          <div class="modal-toggles">
            <button onClick={() => setPostActive(false)} id = {!postActive ? 'active' : ''} className='create-space-btn'> Create Space</button>
            <button onClick={() => setPostActive(true)} id = {postActive ? 'active' : ''} className='create-post-btn'> Create Post</button>
            {!postActive ? <div className='underline-space'></div> : <div className='underline-post'></div>}
            
          </div>
        </div>
        <div className='modal-content'>
                {postActive ? <div className='post-content'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    {user && <img className='prf' src= {user.imgUrl}/>}<span style={{marginLeft: '0.5rem', fontSize: '0.9rem'}}>to <span style={{fontWeight: '700'}}>{window.location.href.includes('spaces')?community?.communityName : 'Main Feed'}</span></span>

                    </div>
                    
                    <textarea value = {message} onChange={(e) => setMessage(e.target.value)} placeholder='Say something...' className='wrapper-class'/>
                  
                </div> : <div className='space-content'>
                            <div className='space-content-head'>
                              <h2>Create a Space</h2> 
                              <p>Share your interests, curate content, host discussions, and more.</p>
                            </div>
                            <div className='space-name'>
                              <label>Name</label>
                              <span>This can be changed in Space settings</span>
                              <input value={spaceName} onChange = {(e) => {setSpaceName(e.target.value)}}/>
                            </div>
                            <div className='space-description'>
                              <label>Brief description</label>
                              <span>Include a few keywords to show people what to expect if they join</span>
                              <input value={spaceDesc} onChange = {(e) => {setSpaceDesc(e.target.value)}}/>
                            </div>
                            
                        
                            
                         </div>}
                         <div className='rule'></div>
                         {postActive ? <>
                                        <div className='modal-cta'>
                                       
                                            <button className='cancel-btn'>Cancel</button>
                                            <button onClick={handleSubmit} className='post-btn'>
                                              {!loading ? <span>Post</span>  :  <ClipLoader color={'white'} loading={loading}  size={10} />}
                                            </button>
                                        </div>
                                        <div className='img-upload-cta'>
                                          <label for = 'img-up' className='img-upload-btn'><span  class="iconify" data-icon="ph:image-thin"></span> <input type= 'file' value={fileInput} onChange ={handleFileInput} id='img-up'/></label> 
                                          { previewSource &&<> <img style = {{width :'60px', height: "40px", marginLeft:'1rem', objectFit:'cover'}}src={previewSource}/> <span></span></>}
                                        </div>
                                       </> : <div className='modal-cta'>
                                                <button className='cancel-btn'>Cancel</button>
                                                <button onClick={createSpace} className='post-btn'>Create</button>
                                             </div>}
        </div>
        
      </div>
     
    </>

  )
}

export default PCreate