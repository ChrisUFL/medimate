import React from 'react'
import Footerlink from './Footerlink'

const Footer = () => {
  return (
    <div className='bottom-0 flex justify-center gap-4 w-full mt-36'>
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
    </div>
  )
}

export default Footer