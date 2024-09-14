import { Link } from '@inertiajs/react'
import React from 'react'

const Navlink = ({name, routeName}) => {
    return (
      <Link href={route(`${routeName}`)}>{name}</Link>
    )
}

export default Navlink