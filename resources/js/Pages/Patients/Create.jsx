import React from 'react'
import ProviderLayout from '@/Layouts/ProviderLayout'
import ShadowBox from '@/Components/ShadowBox'
import { useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import InputError from '@/Components/InputError'

const Create = ({previousRoute}) => {
    const { data, setData, post, processing, errors, transform } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
    });

    transform((data) => ({
        ...data,
        previousRoute: previousRoute ?? null
    }))

    const submit = (e) => {
        e.preventDefault();
        post(route('patients.store', {}, false))
    };

    console.log(previousRoute);
  return (
    <ProviderLayout pageTitle={'Add Patient'}>
        <ShadowBox styles='w-[500px]'>
            <form onSubmit={submit} className='flex flex-col items-center my-5'>
                <div className='mb-5'>
                    <InputLabel value={'First Name'} htmlFor='firstName'/>
                    <TextInput placeholder='First Name' type='text' name='firstName' value={data.first_name} onChange={e => setData('first_name', e.target.value)}/>  
                    <InputError message={errors.firstName} className="mt-2"/>
                </div>
                <div className='mb-5'>
                    <InputLabel value={'Last Name'} htmlFor='lastName'/>
                    <TextInput placeholder='Last Name' type='text' name='lastName' value={data.last_name} onChange={e => setData('last_name', e.target.value)}/>
                    <InputError message={errors.lastName} className="mt-2"/>
                </div>
                <div className='mb-5'>
                    <InputLabel value={'Email Address'} htmlFor='emailAddress'/>
                    <TextInput placeholder='Email Address' type='text' name='emailAddress' value={data.email} onChange={e => setData('email', e.target.value)}/>
                    <InputError message={errors.emailAddress} className="mt-2"/>
                </div>
                <div className='mb-5 w-[198px]'>
                    <InputLabel value={'Date of Birth'} htmlFor='dob'/>
                    <input type='date' className='w-[198px] rounded-md border-gray-300 drop-shadow' name='dob' value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)}/>
                    <InputError message={errors.dob} className="mt-2"/>
                </div>
                <div>
                    <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                </div>
            </form>
        </ShadowBox>
    </ProviderLayout>
  )
}

export default Create