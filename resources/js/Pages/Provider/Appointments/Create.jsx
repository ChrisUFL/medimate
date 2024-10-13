import React from 'react'
import ProviderLayout from '@/Layouts/ProviderLayout'
import { useForm } from '@inertiajs/react'
import ShadowBox from '@/Components/ShadowBox'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'

const Create = () => {
 const { data, setData, post, processing, errors} = useForm({
    patientName: '',
    appointmentTime: '',
    appointmentDate: '',
 })

 const submit = (e) => {
    e.preventDefault(),
    post(route('provider/appointments', {
        params: data
    }))
 }

  return (
    <ProviderLayout pageTitle={'Create Appointment'}>
        <div className='w-96'>
        <form onSubmit={submit}>
            <ShadowBox>
                <div>
                    <InputLabel value="Name" />
                </div>
            </ShadowBox> 
        </form>
          
        </div>
        
        
    </ProviderLayout>
  )
}

export default Create