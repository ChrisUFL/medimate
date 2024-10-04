import React from 'react'

const Contact = (props) => {
    console.log(props)
    return (
        <tr>
            <td class="border border-gray-400 px-3 py-2">{props.name}</td>
            <td class="border border-gray-400 px-3 py-2">j.smith@gmail.com</td>
            <td class="border border-gray-400 px-3 py-2">+1(555) 555-5555</td>
            <td class="border border-gray-400 px-3 py-2">123 Smith Street</td>
        </tr>
    )
  }
  
  export default Contact