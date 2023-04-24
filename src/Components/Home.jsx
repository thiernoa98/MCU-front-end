import React from 'react'
import coverImg from '../assets/cover.webp';

function Home() {
  return (
    <div className='App'>
      <h1>Welcome To Our Movie Application</h1>
      <img src={coverImg} alt="cover image" />
    </div>
  )
}

export default Home
