import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/> Mahi-da-dhabha App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt=''/>
            <img src={assets.app_store} alt='' />
        </div>

    </div>
  )
}

export default AppDownload