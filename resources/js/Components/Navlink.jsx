import { Link } from '@inertiajs/react'
import React from 'react'

const Navlink = ({name, routeName}) => {
    let currentRouteStyle = '';

    if (route().current(routeName)) {
        currentRouteStyle = 'text-slate-500'
    }

    return (
      <Link href={route(`${routeName}`)} className={currentRouteStyle}>{name}</Link>
    )
}

export default Navlink