import React from 'react'

const ReadTextArea = ({label, text, className}) => {
  return (
    <div className={className}>
          <span>{label}</span>
          <div className={'border-2 w-[100%] px-4 py-2 rounded-md'}>
            <span>{text}</span>
          </div>
        </div>
  )
}

export default ReadTextArea