import "../../css/app.css"

import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HomeContent from "../Components/HomeContent"
import Homehead from '../../../public/static/images/homehead.jpeg'

const Home = ({ user, data }) => {
  return (
    <div className="wrapper flex-col min-h-screen grow">
      <img src={ Homehead } alt="" className="-z-10 absolute mx-auto w-screen h-[90%] left-0 right-0 bg-no-repeat blur-sm"/>
      <Navbar />
      <div className={'m-auto z-10'}>
          <section className="content p-4">
            <HomeContent data={ data }/>
          </section>
      </div>
      <Footer />
      </div>
  )
}

export default Home
