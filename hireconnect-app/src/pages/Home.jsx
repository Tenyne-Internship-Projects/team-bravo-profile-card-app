import React from 'react'
import Navbar from '../components/Navbar'
import Onboarding from '../components/Onboarding';


const Home = () => {
  
  return (
    <div className='flex flex-col items-center justify-center bg-blue-200 min-h-screen'>
        <Navbar />
        <Onboarding />
    </div>
  )
}

export default Home