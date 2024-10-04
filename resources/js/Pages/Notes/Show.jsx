import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SimpleLayout from '@/Layouts/SimpleLayout'
import { Head, usePage, router } from '@inertiajs/react'
import { React, useState } from 'react'


function Show({...note}) {
    const page = usePage();
    const [deleteNote, setDeleteNote] = useState(false);

    function goToEdit() {
        router.get(route('notes.edit'));
    }

   
  return (
    <SimpleLayout>
        <Head title={note.note_title} />
        <div className='w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'>
        <h3 className='text-2xl font-semibold my-3'>{note.note_title}</h3>
        <pre className='max-h-screen text-slate-700 text-wrap overflow-auto font-serif'>{note.note_content}</pre>
        <div className='flex justify-end gap-2'>
            {page.props.auth.user && page.props.auth.user.id === note.note_owner && <PrimaryButton>Edit</PrimaryButton>}
            {page.props.auth.user && page.props.auth.user.id === note.note_owner && <DangerButton>Delete</DangerButton>} 
        </div>
        </div>
    </SimpleLayout>
  )
}

export default Show