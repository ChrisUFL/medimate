import { React, useState } from 'react'
import ProviderLayout from '@/Layouts/ProviderLayout'
import Table from '@/Components/Table'
import { router } from '@inertiajs/react'
import { FaSearch } from 'react-icons/fa'
import PrimaryButton from '@/Components/PrimaryButton'

const Index = ({patients, search_term}) => {
    const [searchTerm, setSearchTerm] = useState(search_term ?? '');

    function goToNew () {
        router.get(route('patients.create'))
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
          search();
        }
      }

    function search() {
        router.get(route('patients.index', {
          q: searchTerm,
        }))
      }

    const tableRowClick = (rowData)  => {
        router.get(route('patients.show', {
            patient: rowData.user_id,
        }))
    };

    const tbodyData = patients.map((patient) => {
        return (
            <tr key={patient.user_id} className='hover:bg-indigo-200 hover:cursor-pointer' onClick={() => tableRowClick(patient)}>
                <td className='px-6 py-3'><img src={patient.avatar_url} alt="Avatar" /></td>
                <td className='px-6 py-3'>{patient.first_name}</td>
                <td className='px-6 py-3'>{patient.last_name}</td>
                <td className='px-6 py-3'>{patient.email}</td>
            </tr>
        )
    });

    const theadData = [
        <th className='px-6 py-3'>Avatar</th>,
        <th className='px-6 py-3'>Name</th>,
        <th className='px-6 py-3'>Email Address</th>,
        <th className='px-6 py-3 flex justify-center'>View Profile</th>
    ];

  return (
    <ProviderLayout pageTitle={'Patients'}>
        <div className='w-[1000px]'>
        <div className='flex justify-between drop-shadow-lg'> 
          <div className='flex mb-1'>
            <input type='text' className='h-9 rounded' placeholder='Search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            <div className='h-9 flex items-center absolute left-[170px]' >
              <FaSearch onClick={search} className='text-slate-300 cursor-pointer'/>  
            </div>
                        
          </div>
          <PrimaryButton onClick={goToNew} className='mb-1'>New Patient</PrimaryButton>
        </div>
            <Table 
            theadData={theadData}
            tbodyData={tbodyData}
            />
        </div>
        
    </ProviderLayout>
  )
}

export default Index