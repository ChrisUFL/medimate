import React from 'react'

const Contact = (props) => {
    console.log(props)
    let { name, email, phone, address } = props.contact_data;
    return (
        <tr>
            <td class="border border-gray-400 px-3 py-2">{name}</td>
            <td class="border border-gray-400 px-3 py-2">{email}</td>
            <td class="border border-gray-400 px-3 py-2">{phone}</td>
            <td class="border border-gray-400 px-3 py-2">{address}</td>
        </tr>
    )
  }
  
  export default Contact