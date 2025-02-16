import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
<div className='footer-content'>
    <div   className='footer-content-left'>
        <img src={assets.logo} alt=''/>
        <p>lorem ispir nm dwmi dij iojj rohit jaiswa; kohli pant me unsuccessfull person in India</p>
        <div className='footer-social-icon'>
            <img src={assets.facebook_icon} alt=''/>
            <img src={assets.twitter_icon} alt=''/>
            <img src={assets.linkedin_icon} alt=''/>

        </div>
    </div>
    <div   className='footer-content-center'>
        <h2>Company</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
    </div>

    <div className='footer-content-right'>
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+91 8641098378</li>
            <li>contact@madidaDhaba.com</li>
        </ul>
    </div>

    </div>
    <hr/>
    <p className='footer-copyright'> Copyright 2024 madidaDhaba.com - All Right Reserved</p>
    </div>
  )
}

export default Footer