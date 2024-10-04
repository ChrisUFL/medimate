import React from 'react'
import { Head, useForm } from '@inertiajs/react';
import SimpleLayout from '@/Layouts/SimpleLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Textarea } from '@headlessui/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

function Edit({...note}) {
    const { data, setData, put, processing, errors } = useForm({
        title: note.note_title,
        content: note.note_content,
    })

    function submit(e) {
        e.preventDefault();
        put(route('notes.update', {note: note.note_id}, false))
    }
  return (
    <SimpleLayout>
        <div className='w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'>
            <Head title='Create Note' />
            <section>
                <form onSubmit={submit}>
                    <div className=''>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput placeholder='Title' name='title' type="text" className='mt-1 block w-full' value={data.title} onChange={e => setData('title', e.target.value)} />
                        <InputError message={errors.title} className="mt-2"/>
                    </div>

                    <div className='mt-4'>
                        <InputLabel htmlFor="content" value="Note" />
                        <Textarea placeholder='Note' name='content' className='mt-1 block w-full rounded' rows={3} value={data.content} onChange={e => {setData('content', e.target.value)}}></Textarea>
                        <InputError message={errors.content} className="mt-2"/>  
                    </div>
                    
                    <div className='flex justify-end'>
                        <PrimaryButton className='mt-2' disabled={processing}>Update</PrimaryButton>
                    </div>
                    
                </form>
            </section>
        </div>
    </SimpleLayout>
    
  )
}

export default Edit