import React from 'react'
import ProviderLayout from '../../Layouts/ProviderLayout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Home() {
  return (
    <ProviderLayout pageTitle={'Provider'}>
      <FullCalendar 
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"/>
    </ProviderLayout>
  )
}

export default Home