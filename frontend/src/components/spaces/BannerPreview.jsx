import axios from 'axios';
import {React, useState} from 'react'
import { useQueryClient } from 'react-query';
import ClipLoader from "react-spinners/ClipLoader";

const BannerPreview = ({showBanner, toggle, community}) => {

    const [fileInput, setFileInput] = useState('')
    const [previewSource, setPreviewSource] = useState(null)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const saveUpdate = async () => {
        setLoading(true)
        await axios({
            method:'put',
            url: `http://localhost:5000/community/${community?._id}/changeBanner`,
            withCredentials: true,
            data:{
                imgbase64: previewSource
            }
        }).then((response) => { queryClient.invalidateQueries("community");setLoading(false); toggle(false)})

       


    }
    const handleFileInput = (e) => {

        const file = e.target.files[0]
        previewFile(file)
    }
  

  
    const previewFile = (file) => {
  
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

  return (
    showBanner && <>
        <div className='modal-background'></div>
        <div  id='e-modal' className='animate__animated animate__fadeIn animate__faster'>
            <span onClick={() => toggle(false)} class="close">&times;</span>
            <div style={{width: '100%', height: '75%', marginLeft: 'auto', padding: '1rem'}} className='profile-section'>
           
               <div style={{width: '100%', height: '80%', display: 'flex', alignItems:'flex-start', flexDirection: 'column'}}>
                    <span style={{color: 'black', textAlign: 'left', marginBottom: '0.7rem', fontWeight: '600'}}> Preview</span>
                    {!previewSource && <div style={{color: 'black', 
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
                            <input type = 'file' /><input type= 'file' value={fileInput} onChange ={handleFileInput}   id='img-up'/>
                        </label>
                    </div>}
                    {previewSource && <label style={{color: 'black', display: 'flex', alignItems: 'center'}} for = 'img-up' className='img-upload-btn'><span style={{cursor: 'pointer'}} class="iconify" data-icon="ph:image-thin" data-width="25"></span>   <input type= 'file' value={fileInput} onChange ={handleFileInput}   id='img-up'/></label>  }
                    {previewSource && <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={previewSource}/>}
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

export default BannerPreview