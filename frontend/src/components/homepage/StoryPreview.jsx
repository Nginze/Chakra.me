import axios from 'axios';
import {React, useState, useContext} from 'react'
import { useQueryClient } from 'react-query';
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from '../../contexts/UserContext';

const StoryPreview = ({showBanner, toggle}) => {
    const {data: user} = useContext(userContext)
    const [fileInput, setFileInput] = useState('')
    const [previewSourceOne, setPreviewSourceOne] = useState(null)
    const [previewSourceTwo, setPreviewSourceTwo] = useState(null)
    const [previewSourceThree, setPreviewSourceThree] = useState(null)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const saveUpdate = async () => {
        setLoading(true)
        await axios({
            method:'post',
            url: `http://localhost:5000/story/`,
            withCredentials: true,
            data:{
                imgbase64: [previewSourceOne, previewSourceTwo, previewSourceThree],
                userId: user._id
            }
        }).then((response) => { setLoading(false); toggle(false)})

       


    }
    const handleFileInput = (e) => {
        
        const files = []
        for(let i = 0; i < e.target.files.length; i++)
        {
            files.push(e.target.files[i])
        }
        previewFile(files)
    }
  

  
    const previewFile = (files) => {
  
        
        for(let i = 0; i < files.length; i++)
        {
            const reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onloadend = () => {
                if(i == 0)
                {
                    setPreviewSourceOne(reader.result)
                }

                if(i == 1)
                {
                    setPreviewSourceTwo(reader.result)
                }

                if(i == 2)
                {
                    setPreviewSourceThree(reader.result)
                }
                
            }
        }
       
       
    }

  return (
    showBanner && <>
        <div className='modal-background'></div>
        <div  id='e-modal' className='animate__animated animate__fadeIn animate__faster'>
            <span onClick={() => toggle(false)} class="close">&times;</span>
            <div style={{width: '100%', height: '75%', marginLeft: 'auto', padding: '1rem'}} className='profile-section'>
           
               <div style={{width: '100%', height: '80%', display: 'flex', alignItems:'flex-start', flexDirection: 'column', overflowY: 'auto'}}>
                    <span style={{color: 'black', textAlign: 'left', marginBottom: '0.7rem', fontWeight: '600'}}> Preview</span>
                    {!previewSourceOne && <div style={{color: 'black', 
                                 width: '100%', 
                                 display: 'flex', 
                                 justifyContent: 'center', 
                                 alignItems: 'center', 
                                 border: '1px dashed #8f93f3', 
                                 borderRadius: '8px', 
                                 padding: '3rem', 
                                 cursor: 'pointer'}}>
                        <label style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} for = 'img-up'>
                            <span style={{ cursor: 'pointer', color: '#8f93f3'}} class="iconify" data-icon="bi:cloud-upload" data-width="70"></span>
                            <span style={{marginTop: '1rem'}}>No file chosen</span>
                            <input type= 'file' multiple value={fileInput} onChange ={handleFileInput}   id='img-up'/>
                        </label>
                    </div>}
                    {previewSourceOne && <label style={{color: 'black', display: 'flex', alignItems: 'center'}} for = 'img-up' className='img-upload-btn'><span style={{cursor: 'pointer'}} class="iconify" data-icon="ph:image-thin" data-width="25"></span>   <input multiple type= 'file' value={fileInput} onChange ={handleFileInput}   id='img-up'/></label>  }
                    {previewSourceOne && <img style={{width: '100%', height: '70%', objectFit: 'cover', marginBottom: '1rem'}} src={previewSourceOne}/>}
                    {previewSourceTwo && <img style={{width: '100%', height: '70%', objectFit: 'cover', marginBottom: '1rem'}} src={previewSourceTwo}/>}
                    {previewSourceThree && <img style={{width: '70%', height: '70%', objectFit: 'cover', marginBottom: '1rem'}} src={previewSourceThree}/>}
               </div>
               <div className='modal-cta'>
                    <button onClick={() => toggle(false)} className='cancel-btn'>Cancel</button>
                    <button onClick={saveUpdate} style = {{width: '5rem'}} className='post-btn'>{!loading ? <span>Save</span>  :  <ClipLoader color={'white'} loading={loading}  size={10} />}</button>
                </div> 
            </div>
        </div>
        
    </>
   
  )
}

export default StoryPreview