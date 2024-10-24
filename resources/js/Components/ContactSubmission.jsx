import React, {
    useState,
  } from "react";

const ContactSubmission = () => {

    const [formData, setFormData] = useState({
        user_pk: 1, 
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const updateForm = (e) => {
        
        if(e.target.name == "name"){
            setFormData({
                ...formData,
                ["name"]: e.target.value
            });
        }else if (e.target.name == "email"){
            setFormData({
                ...formData,
                ["email"]: e.target.value
            });
        } else if (e.target.name == "phone"){
            setFormData({
                ...formData,
                ["phone"]: e.target.value
            });
        }else if (e.target.name == "address"){
            setFormData({
                ...formData,
                ["address"]: e.target.value
            });
        }
    };

    console.log(formData);
  return (
    <div>
        <form action="" className="border border-solid w-4/5 flex justify-center items-center flex-col">
            <div className = "flex justify-center items-center flex-row ">
                <label>Name: </label>
                <input type="text" placeholder = "Albert Gator" name = "name" onChange={updateForm}/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Email: </label>
                <input type="text" placeholder = "albert.gator@ufl.edu" name = "email" onChange={updateForm}/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Phone Number: </label>
                <input type="text" placeholder = "+1 (352) 123-4567" name = "phone" onChange={updateForm}/>
            </div>
            <div className = "flex justify-center items-center flex-row ">
                <label>Address: </label>
                <input type="text" placeholder = "1 Swamp Ave." name = "address" onChange={updateForm}/>
            </div>
            <button>Submit</button>
            
        </form>
    </div>
  )
}

export default ContactSubmission