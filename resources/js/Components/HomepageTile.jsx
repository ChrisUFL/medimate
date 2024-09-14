import React from 'react'

const HomepageTile = ({ title, data, styles }) => {
  let listItems = [];
  for (const [key, value] of Object.entries(data)) {
    listItems.push(<li key={value.id}>{`${value.date} - ${value.title}`}</li>)
  }
  
  return (
    <div className={`h-64 w-1/2 bg-slate-600 rounded-md p-2 ${ styles }`}>
        <h1>{ title }</h1>
        <ul>{ listItems }</ul>
    </div>
  )
}

export default HomepageTile