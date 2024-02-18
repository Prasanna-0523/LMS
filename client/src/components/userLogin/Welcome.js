import React from 'react'
import image from '../../assets/images/Welcome.jpg'
export default function Welcome() {
  return (
    <div className='col'>
      <h1>Welcome to LMS</h1>
        <img src={image} className="img-fluid" width={700} alt="welcome"/>
    </div>
  )
}
