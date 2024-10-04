import Navbar from '@/Components/Navbar'
import SimpleLayout from '@/Layouts/SimpleLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'
import { FaLink } from 'react-icons/fa'

const Notes = ({notes}) => {
  const page = usePage();

  const content = notes.map( (note) => {
    return (
      <tr key={ note.note_id }>
      <td className='px-6 py-3'>{ note.title }</td>
      <td className='px-6 py-3'>{ note.content }</td>
      <td className='px-6 py-3 flex justify-center'><Link href={route('notes.show', {'note': note.note_id })}><FaLink /></Link></td>
      </tr> )
  });

  return (
    <SimpleLayout>
      <Head title='Notes' />
        <div className='mt-3 flex-col max-w-[1280px] w-[70%]'>
        <div className='flex justify-end drop-shadow-lg'> 
          <Link href={route('notes.create')} className='rounded-[15px] bg-indigo-400 p-2 my-2'>Add Note</Link>
        </div>
      
        <div className="relative overflow-x-auto">
          <table className='w-full text-md text-left'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Title</th>
                <th className='px-6 py-3'>Content</th>
                <th className='px-6 py-3 flex justify-center'>View</th>
              </tr>
            </thead>
            <tbody className="bg-white border-b">
              { content }
            </tbody>
          </table>
        </div>
        </div>
    </SimpleLayout>
  )
}

export default Notes