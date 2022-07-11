import React, { useState } from 'react'
import '../../styles/Rule.css'

const Rule = () => {
  const [showExplanation, setShowExplanation] = useState(false)
  return (
    <div id='rule'>
        <div onClick={() => setShowExplanation(!showExplanation)} className='rule-statement'>
            <span>No cussing</span>
            <span class="iconify" data-icon="bx:chevron-down" data-width="15"></span>
        </div>
        {
          showExplanation &&
            <div className='explanation'>
                This post is only speculation without official news or announcement from club sources.
            </div>
        
        }
    </div>
  )
}

export default Rule