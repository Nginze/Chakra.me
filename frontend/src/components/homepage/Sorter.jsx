import axios from 'axios'
import {React, useState} from 'react'
import { useQueryClient, useQuery } from 'react-query'
import '../../styles/Sorter.css'

const Sorter = ({setType, refetch, type}) => {
  const [show, setShow] = useState(false)
  const queryClient  = useQueryClient()

  return (
    <div id='post-sorter' style={{display: 'flex'}}>
       {type == 'top' ? <button onClick={() => setShow(!show)}>Top <i class="fa-solid fa-arrow-trend-up"></i></button>
       : <button onClick={() => setShow(!show)}>Recent <i class="fa-solid fa-arrow-rotate-right"></i></button>}
       <div style={{display: `${show? 'flex': 'none'}`}} className='options'>
            <button onClick={  () => {setType('top'); refetch()}}>Top {type == 'top' && <i class="fa-solid fa-check"></i>}</button>
            <button onClick={ () => { setType('recent');refetch()}}>Recent {type == 'recent' && <i class="fa-solid fa-check"></i>}</button>
       </div>
    </div>
  )
}

export default Sorter