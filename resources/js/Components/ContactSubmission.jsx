import React from 'react'

const ContactSubmission = () => {
  return (
    <div>
        <form action="" className="border border-solid w-4/5 flex justify-center items-center flex-col">
            <div className = "flex justify-center items-center flex-row ">
                <label>Name: </label>
                <input type="text" placeholder = "Albert Gator"/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Email: </label>
                <input type="text" placeholder = "albert.gator@ufl.edu"/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Phone Number: </label>
                <input type="text" placeholder = "+1 (352) 123-4567"/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Address: </label>
                <input type="text" placeholder = "1 Swamp Ave."/>
            </div>
            
        </form>
    </div>
  )
}

export default ContactSubmission