import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  return (
    <div id='login'>
        <div className='login-wrapper'>
            <span className='login-header'>Welcome 👋</span>
            <span className='legal-policy'>By logging in you accept our Privacy Policy and Terms of Service.</span>
            <div className='social-logins-container'>
                <div className='ct'>
                    <button  className='google-btn'><img src="https://img.icons8.com/color/48/000000/google-logo.png"/> <div>Google</div></button>
                    <button className='google-btn'><span class="iconify" data-icon="akar-icons:facebook-fill"></span> <div>Facebook</div></button>
                    <button id='github-btn'  className='google-btn'><span class="iconify" data-icon="bi:github" data-width="48"></span> <div>GitHub</div></button>
                    <button id='discord-btn' className='google-btn'><span class="iconify" data-icon="bxl:discord-alt" data-width="48"></span> <div>Discord</div></button>
                </div>
                <div className='ft'>
                    Chakra.me© All Rights Reserved
                </div> 
            </div>
        </div>
        <div className='login-footer' >
           <div className='logo'><img src="https://img.icons8.com/color/30/000000/naruto-sign.png"/>Chakra.me</div>
           <div  >
                <Link to = '/'>Privacy Policy</Link>
                <Link to = '/'></Link>
           </div>
        </div>
    </div>
  )
}

export default Login