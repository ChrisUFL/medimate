import React from 'react'
import Footerlink from './Footerlink'

const Footer = () => {
  return (
    <div className='absolute flex justify-center gap-4 bottom-8 w-full'>
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
        <Footerlink name="Contact Us" routeName="web.home" />
    </div>
  )
}

export default Footer