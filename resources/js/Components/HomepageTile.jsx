import React from 'react'

const HomepageTile = ({ user }) => {
  return (
    <div className={'h-64 w-64 bg-slate-600'}>
        <span>{ user.username }</span>
        <space> { user.type } </space>
    </div>
  )
}

export default HomepageTile