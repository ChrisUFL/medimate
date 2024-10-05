import { Link } from '@inertiajs/react'
import React from 'react'

function Paginator({links, currentPage, lastPage}) {
  return (
    <div>
        {links.map(link => {
        if (currentPage === 1 && link.label.includes('&laquo;')) {
            return;
        }

        if (currentPage === lastPage && link.label.includes('&raquo;')) {
            return;
        }

        let label = link.label;
        label = label.replace('&laquo;', '\u00AB')
        label = label.replace('&raquo;', '\u00BB')
        
        return <Link href={link.url} key={link.label} className="mx-1">{label}</Link>
    })}
    </div>
  )
}

export default Paginator