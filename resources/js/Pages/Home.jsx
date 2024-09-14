import "../../css/app.css"

import React from 'react'
import Navbar from '../Components/Navbar'
import HomepageTile from "../Components/HomepageTile"

const Home = ({ user }) => {
  return (
    <div className={'w-[1280px] m-auto'}>
        <Navbar />
        <HomepageTile user={ user }/>
    </div>
  )
}

export default Home
