import {React, useEffect} from 'react'

const Callback = () => {

    useEffect(() => {
    
        
         if (window.opener) {
           window.opener.location.reload()
           window.close();
         }
       });
  return (
    <div style={{marginTop: '6rem'}}>Please Wait ... </div>
  )
}

export default Callback