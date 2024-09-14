import "../../css/app.css"

import React from "react"
import Navbar from "../Components/Navbar"
import HomepageTile from "../Components/HomepageTile"
import Footer from "../Components/Footer"
import Bg from "../../../public/static/images/homebg.png"

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
      <p className="text-white flex justify-center">This is where a singular card will go welcoming people to the website with some info about what we do.</p>
    </section>
  )
}

const Home = ({ user, calendar }) => {
  return (
    <div className="wrapper flex-col">
      <img src={ Bg } alt="" className="-z-10 absolute min-h-screen object-center bg-no-repeat object-cover blur-sm"/>
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
