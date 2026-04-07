import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='LandingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Stream Meet</h2>
        </div>
        <div className='navList'>
          <p>Join us guest</p>
          <p>Register</p>
          <p>Login</p>
        </div>
      </nav>

      <div className='landingMainContainer'>
        <div>
          <h1><span style={{color:"#FF9839"}}>Connect</span> with your  loved ones</h1>
          <p>Cover a distance by Strem-Meet</p>
          <div role="button">
            <Link to="/home">Get Started</Link>
          </div>
        </div>
        <div className='MainImage'>
          <img src="mobile.png"></img>
        </div>
      </div>
    </div>
  )
}
