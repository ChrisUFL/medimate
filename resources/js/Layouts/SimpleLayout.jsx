import Navbar from '@/Components/Navbar'
import React from 'react'

function SimpleLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <Navbar/>
        <div className='content flex justify-center w-full max-w-[1000px]'>
            { children }
        </div>
    </div>
  )
}

export default SimpleLayout