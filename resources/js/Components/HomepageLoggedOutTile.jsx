import React from 'react'
import dbell from '../../../public/static/images/gym-dumbbell-icon.svg'

const HomepageLoggedOutTile = ({image, title, text, color}) => {
  return (
    <div className={`flex-col justify-center w-72 px-5 pb-5 ${color}`}>
        <img src={ dbell } alt={ title } className='flex h-[48px] mx-auto my-8'/>

        <h1 className='flex justify-center text-3xl mb-3'>This is a title</h1>

        <span className='flex text-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
    </div>
  )
}

export default HomepageLoggedOutTile