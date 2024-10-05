import Navbar from '@/Components/Navbar'
import Paginator from '@/Components/Paginator'
import PrimaryButton from '@/Components/PrimaryButton'
import SimpleLayout from '@/Layouts/SimpleLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import React from 'react'
import { FaLink } from 'react-icons/fa'

const Notes = ({notes}) => {
  const page = usePage();

  console.log(notes);
  function goToNew () {
    router.get(route('notes.create'))
  }

  const content = notes.data.map( (note) => {
    let note_content = note.content.substring(0, 85).trim();
    note_content += note.content.length > 50 ? '...' : '';

    return (
      <tr key={ note.note_id }>
      <td className='px-6 py-3'>{ note.title }</td>
      <td className='px-6 py-3'>{ note_content }</td>
      <td className='px-6 py-3 flex justify-center'><Link href={route('notes.show', {'note': note.note_id })}><FaLink /></Link></td>
      </tr> )
  });

  return (
    <SimpleLayout>
      <Head title='Notes' />
        <div className='mt-3 flex-col max-w-[1280px] w-[70%]'>
        <div className='flex justify-end drop-shadow-lg'> 
          <PrimaryButton onClick={goToNew} className='mb-2'> Add Note </PrimaryButton>
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
          <Paginator links={notes.links} currentPage={notes.current_page} lastPage={notes.last_page}/>
        </div>
        </div>
    </SimpleLayout>
  )
}

export default Notes