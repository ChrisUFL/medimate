import Navbar from '@/Components/Navbar'
import React from 'react'

function SimpleLayout({ children }) {
  return (
    <div>
        <Navbar/>
        <div className='content flex justify-center bg-gray-200 min-h-screen w-screen'>
            { children }
        </div>
    </div>
  )
}

export default SimpleLayout