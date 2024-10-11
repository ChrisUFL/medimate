import React from 'react'
import ProviderLayout from '../../Layouts/ProviderLayout'

function Home() {
  return (
    <ProviderLayout pageTitle={'Provider'}>
      <div className='w-full'>
        <table className='w-full text-md text-left'>
        <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Appt. Time</th>
            <th className='px-6 py-3'>Name</th>
            <th className='px-6 py-3'>View Patient</th>
          </tr>
        </thead>
        <tbody>
          <tr className='even:bg-indigo-100'>
            <td className='px-6 py-2'>11:30</td>
            <td className='px-6 py-2'>Chris Smiley</td>
            <td className='px-6 py-2'>Link</td>
          </tr>
          <tr className='even:bg-indigo-100'>
            <td className='px-6 py-3'>11:30</td>
            <td className='px-6 py-3'>Chris Smiley</td>
            <td className='px-6 py-3'>Link</td>
          </tr>
          <tr className='even:bg-indigo-100'>
            <td className='px-6 py-3'>11:30</td>
            <td className='px-6 py-3'>Chris Smiley</td>
            <td className='px-6 py-3'>Link</td>
          </tr>
          <tr className='even:bg-indigo-100'>
            <td className='px-6 py-3'>11:30</td>
            <td className='px-6 py-3'>Chris Smiley</td>
            <td className='px-6 py-3'>Link</td>
          </tr>
          <tr className='even:bg-indigo-100'>
            <td className='px-6 py-3'>11:30</td>
            <td className='px-6 py-3'>Chris Smiley</td>
            <td className='px-6 py-3'>Link</td>
          </tr>

        </tbody>
      </table>
      </div>
      
    </ProviderLayout>
  )
}

export default Home