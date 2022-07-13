import axios from 'axios';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import ClipLoader from "react-spinners/ClipLoader";

const RuleModal = ({show, toggle, community}) => {

    const [loading, setLoading] = useState(false)
    const [rule, setRule] = useState('')
    const [ruleDescription, setRuleDescription] = useState('')
    const queryClient = useQueryClient() 
    const createRule = async () => {
        setLoading(true)

        await axios({
            method:'put',
            url: `http://localhost:5000/community/${community?._id}/addRule`,
            withCredentials: true,
            data:{
                rule: rule,
                description: ruleDescription
            }
        })

        queryClient.invalidateQueries("community");setLoading(false); toggle(false)
        
    }
  return (
    show &&
        <>
            <div className='modal-background'></div>
            <div style={{height: '20vh'}}  id='e-modal' className='animate__animated animate__fadeIn animate__faster'>
                  <span onClick={() => toggle(false)} class="close">&times;</span>
                 <div className='profile-section'>
                
                  <div  className='space-name'>
                        <label>Rule</label>
                        <input value={rule} onChange = {(e) => setRule(e.target.value)} />
                        <span>Rule displayed (e.g No photos)</span>
                  </div>
                        <div className='space-description'>
                            <label>Full description</label>
                            <input value={ruleDescription} onChange = {(e) => setRuleDescription(e.target.value)} />
                            <span>Enter the full description of the rule</span>  
                        </div>
                 </div>

                    <div className='modal-cta'>
     
                        <button onClick={() => toggle(false)} className='cancel-btn'>Cancel</button>
                        <button onClick={createRule} style = {{width: '5rem'}} className='post-btn'>{!loading ? <span>Save</span>  :  <ClipLoader color={'white'} loading={loading}  size={10} />}</button>
                        </div> 
                    </div>
            
                
        </>

  )
}

export default RuleModal