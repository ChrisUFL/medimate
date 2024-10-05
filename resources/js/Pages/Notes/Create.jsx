import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SimpleLayout from '@/Layouts/SimpleLayout';
import { Label, Textarea } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    })

    function submit(e) {
        e.preventDefault();
        post(route('notes.store', {}, false))
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
                        <PrimaryButton className='mt-2' disabled={processing}>Submit</PrimaryButton>
                    </div>
                    
                </form>
            </section>
        </div>
    </SimpleLayout>
    
  )
}

export default Create