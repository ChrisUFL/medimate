import "../../css/app.css"

import React from 'react'
import Navbar from '../Components/Navbar'
import HomepageTile from "../Components/HomepageTile"

const Home = ({ user, calendar }) => {
  return (
    <div className="wrapper flex-col bg-gray-100 min-h-screen">
      <Navbar />
      <div className={'w-[1280px] m-auto'}>
          <section className="context p-4">
            <div className="column flex">
              <HomepageTile title={ "Calendar" } data={ calendar } styles="mr-5 mb-5"/>
              <HomepageTile title={ "Calendar" } data={ calendar }/>
            </div>
            <div className="column flex">
              <HomepageTile title={ "Calendar" } data={ calendar } styles="mr-5"/>
              <HomepageTile title={ "Calendar" } data={ calendar }/>
            </div>
          </section>
      </div>
    </div>
  )
}

export default Home
