import "../../css/app.css"

import React from "react"
import Navbar from "../Components/Navbar"
import HomepageTile from "../Components/HomepageTile"
import Footer from "../Components/Footer"
import HomeLoggedOut from "../Components/HomeLoggedOut"
import Homehead from '../../../public/static/images/homehead.jpeg'

function IsSignedIn({ user, calendar }) {

  if (user !== undefined) {
    return (
      <section>
            <div className="column flex">
              <HomepageTile title={ "Calendar" } data={ calendar } styles="mr-5 mb-5"/>
              <HomepageTile title={ "Calendar" } data={ calendar }/>
            </div>
            <div className="column flex">
              <HomepageTile title={ "Calendar" } data={ calendar } styles="mr-5"/>
              <HomepageTile title={ "Calendar" } data={ calendar }/>
            </div>
      </section>
    )
  }

  return (
    <section>
      <HomeLoggedOut />
    </section>
  )
}

const Home = ({ user, calendar }) => {
  return (
    <div className="wrapper flex-col">
      <img src={ Homehead } alt="" className="-z-10 absolute mx-auto w-[3000px] min-h-screen left-0 right-0 bg-no-repeat object-cover blur-sm"/>
      <Navbar />
      <div className={'w-[1280px] m-auto z-10'}>
          <section className="content p-4">
            <IsSignedIn user={ user } calendar={ calendar }/>
          </section>
      </div>
      <Footer />
      </div>
  )
}

export default Home
