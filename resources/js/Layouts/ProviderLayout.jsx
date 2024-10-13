import ProviderNavbar from '@/Components/ProviderNavbar'
import { Head } from '@inertiajs/react'
import React from 'react'

function SimpleLayout({ children, pageTitle }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <Head title={pageTitle}/>
        <ProviderNavbar />
        <div className='content flex justify-center w-full max-w-[1000px] py-8'>
            { children }
        </div>
    </div>
  )
}

export default SimpleLayout
