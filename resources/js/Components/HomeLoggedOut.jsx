import React from 'react'
import HomepageLoggedOutTile from './HomepageLoggedOutTile'

const HomeLoggedOut = () => {
  return (
    <section className="title flex-col m-auto justify-center  px-10">
        <div className='title flex-col m-auto justify-center'>
            <h1 className='header text-slate-800 font-semibold text-7xl'>Medimate</h1>
            <h3 className='footer text-slate-800 font-normal text-xl mt-1'>Simplifying the Healthcare Process</h3>
        </div>

        <div className='flex mt-[120px] justify-center'>
            <HomepageLoggedOutTile color="bg-gray-300"/>
            <HomepageLoggedOutTile color="bg-gray-400"/>
            <HomepageLoggedOutTile color="bg-gray-500"/>
        </div>
    </section>
  )
}

export default HomeLoggedOut