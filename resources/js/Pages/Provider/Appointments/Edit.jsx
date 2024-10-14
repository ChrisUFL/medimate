import React from 'react'
import ProviderLayout from '@/Layouts/ProviderLayout'
import { useForm } from '@inertiajs/react'
import ShadowBox from '@/Components/ShadowBox'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import Select from 'react-select'
import PrimaryButton from '@/Components/PrimaryButton'

const Edit = ({id, patient, employees = [], dateTime, first_name, last_name, doctor}) => {
  let time = '';
  let date = '';
 
  if (dateTime !== undefined) {
     const [datePart, timePart] = dateTime.split('T');
     time = timePart.substring(0, 5);
     date = datePart;
  }

 const { data, setData, patch, processing, errors} = useForm({
    patientId: patient,
    doctorId: doctor,
    appointmentTime: time ?? '',
    appointmentDate: date ?? '',
 })

 const submit = (e) => {
    e.preventDefault(),
    patch(route('appointments.update', {
      appointment: id
    }))
 }
 
 const employeesOptions = employees.map((employee) => {
    const name = employee.first_name + ' ' + employee.last_name;
    return (
        {
            value: employee.user_id,
            label: name
        }
    )
 })

 const currentDoctor = employeesOptions.find(employee => employee.value === doctor);

  return (
    <ProviderLayout pageTitle={'Create Appointment'}>
        <div className='w-96'>
        <form onSubmit={submit}>
            <ShadowBox styles={'h-[400px] py-8'}>
                <div>
                    <InputLabel value="User" />
                    <TextInput value={first_name + ' ' + last_name} readOnly={true} className='w-[100%]'/>
                </div>
                <div className='mt-4'>
                    <InputLabel value="Doctor" />
                    <Select 
                    options={employeesOptions} 
                    defaultValue={currentDoctor}
                    onChange={(e) => setData('doctorId', e?.value)} 
                    isClearable={true}
                    />
                </div>
                <div className='mt-4'>
                    <InputLabel value='Select Date' htmlFor='date' />
                    <TextInput type='date' name='date' value={data.appointmentDate} onChange={(e) => setData('appointmentDate', e.target.value)} className='w-[100%]' />
                </div>
                <div className='mt-4'>
                    <InputLabel value='Select Time' htmlFor='time' />
                    <TextInput type='time' name='time' value={data.appointmentTime} onChange={(e) => setData('appointmentTime', e.target.value)} className='w-[100%]' />
                </div>
                <div className='mt-4'>
                    <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                </div>
            </ShadowBox> 
        </form>
          
        </div>
        
        
    </ProviderLayout>
  )
}

export default Edit