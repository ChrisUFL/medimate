import { Link } from '@inertiajs/react'
import React from 'react'
import Navlink from './Navlink'
import logo from '../../../public/static/images/logo_64.png'

const Navbar = () => {
  return (
    <div className='flex align-middle justify-between mt-5 mb-5 font-medium text-center text-l leading-8'>
        <div className='logo flex'>
          <Link href={ route('web.home') }>
          <img src='../../static/images/logo_64.png' alt={ logo } width={ 32 } height={ 32 }/>
          </Link>
          <span className='ml-2'>MediMate</span>
        </div>

        <div className='links flex gap-5'>
        <Navlink name='Home' routeName='web.home' />
        <Navlink name='Medications' routeName='web.medications' />
        <Navlink name='Notes' routeName='web.notes' />
        <Navlink name='Appointments' routeName='web.appointments' />
        <Navlink name='Fitness' routeName='web.fitness' />
        </div>

        <div className="account">
          <Link href={''}>Login</Link>
        </div>
    </div>
  )
}

export default Navbar