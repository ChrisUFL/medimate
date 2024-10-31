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

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/addressbook', formData);
            console.log('New contact:', response.data);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    console.log(formData);
  return (
    <div className="flex justify-center items-center flex-col">
        
        <form onSubmit={postData} className="flex justify-center items-center flex-col p-4">

            <div className = "flex flex-col items-start p-4 ">
                <label ><b>Name</b></label>
                <input type="text" placeholder = "Albert Gator" name = "name" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <div className = "flex flex-col items-start p-4">
                <label ><b>Email</b></label>
                <input  type="text" placeholder = "albert.gator@ufl.edu" name = "email" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <div className = "flex flex-col items-start p-4">
                <label><b>Phone Number</b></label>
                <input type="text" placeholder = "+1 (352) 123-4567" name = "phone" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <div className = "flex flex-col items-start p-4">
                <label><b>Address</b> </label>
                <input type="text" placeholder = "1 Swamp Ave." name = "address" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <button style={{ backgroundColor: '#1d4ed8'}} className=" text-white py-2 px-4 rounded" type="submit">Submit</button>
            
        </form>
    </div>
  )
}

export default ContactSubmission