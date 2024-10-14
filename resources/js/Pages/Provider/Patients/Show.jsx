import React from 'react'
import ProviderLayout from '@/Layouts/ProviderLayout'
import { FaHouseUser, FaHome, FaClipboard, FaNotesMedical } from 'react-icons/fa'
import { FaHeartPulse, FaUser, FaCalendarDays } from "react-icons/fa6";
import ShadowBox from '@/Components/ShadowBox';
import TextInput from '@/Components/TextInput';
import ReadTextArea from '@/Components/ReadTextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

const Show = () => {
  return (
    <ProviderLayout>
      <ShadowBox styles='w-max-[750px]'>
      <div className='flex justify-start w-[100%]'>
      <div className='border-2 border-indigo-400 rounded-md p-1 flex items-center border-r-[1px] rounded-r-none hover:cursor-pointer'>
        <FaUser className='h-5 w-5 inline mr-2'/>
        <span className='text-lg font-semibold'>User</span>
      </div>
      <div className='border-2 border-indigo-200 rounded-md p-1 flex items-center border-l-[1px] border-r-[1px] rounded-l-none rounded-r-none hover:cursor-pointer'>
       <FaNotesMedical className='h-5 w-5 inline mr-2'/>
       <span className='text-lg font-semibold'>Chart</span> 
      </div>
      <div className='border-2 border-indigo-200 rounded-md p-1 flex items-center border-l-[1px] border-r-[1px] rounded-l-none hover:cursor-pointer rounded-r-none'>
        <FaHeartPulse className='h-5 w-5 inline mr-2'/> 
        <span className='text-lg font-semibold'>Vitals</span>
      </div>
      <div className='border-2 border-indigo-200 rounded-md p-1 flex items-center border-l-[1px] rounded-l-none hover:cursor-pointer'>
        <FaCalendarDays className='h-5 w-5 inline mr-2'/> 
        <span className='text-lg font-semibold'>Appointments</span>
      </div>
      </div>
      <ShadowBox styles='user hidden'>
        <div className='flex justify-center mb-6'>
          <img src="https://placehold.co/100" alt="Profile Picture" className='rounded-[50%]'/>
        </div>
        <div className='flex gap-10'>
          <div className='w-1/2'>
          <div className='flex flex-col items-center w-[100%] gap-6'>
            <div className="flex w-[100%] justify-center">
              <ReadTextArea label='First Name' text='Chris' className='w-1/2'/>
              <ReadTextArea label='Last Name' text='Smiley' className='ml-10 w-1/2'/>
            </div>
            <div className='flex w-[100%]'>
                <ReadTextArea label='Email' text='chris@medimate.xyz' className='w-[100%]'/>
            </div>
            <div className='flex w-[100%]'>
                <ReadTextArea label='Phone' text='123-456-7890' className='w-[100%]'/>
            </div>
            <div className='flex w-[100%]'>
                <ReadTextArea label='Address' text='123 A Street Gainesville, FL' className='w-[100%]'/>
            </div>   
          </div>
          </div>
          <div div className='w-1/2'>
            <div className='flex flex-col items-center w-[100%] gap-6'>
              <div className="flex w-[100%] justify-center">
                <ReadTextArea label='Gender' text='Male' className='w-1/2'/>
                <ReadTextArea label='Language' text='English' className='ml-10 w-1/2'/>
              </div>
              <div className='flex w-[100%]'>
                  <ReadTextArea label='Date of Birth' text='January 1, 1970' className='w-[100%]'/>
              </div>
              <div className='flex w-[100%]'>
                  <ReadTextArea label='PlaceHolder' text='PlaceHolder' className='w-[100%]'/>
              </div>
              <div className='flex w-[100%]'>
                  <ReadTextArea label='PlaceHolder' text='PlaceHolder' className='w-[100%]'/>
              </div>   
            </div>
          </div>
        </div>
        <div className='flex justify-end gap-3 mt-3'>
          <PrimaryButton>Edit</PrimaryButton>
          <DangerButton>Delete</DangerButton>
        </div>
      </ShadowBox>
      <ShadowBox className='chart'>

      </ShadowBox>
      </ShadowBox>
    </ProviderLayout>
  )
}

export default Show