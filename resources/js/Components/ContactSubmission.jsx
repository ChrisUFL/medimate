import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  // Component used to manage submitting queries to the databsae (add, edit, delete)
const ContactSubmission  = ({
    values = {
        user_pk: 1,
        name: '',
        email: '',
        phone: '',
        address: ''
    }}) => {
//if default values are provided, set the values
    const [formData, setFormData] = useState({
        user_pk: values.user_pk || 1,
        name: values.name || '',
        email: values.email || '',
        phone: values.phone || '',
        address: values.address || ''
    });

//logic used to control whether the delete and edit buttons, or the add buttons should be shown
    let showDelete = false;
    if(values.name != ''){
        showDelete = true;
    }

//function to update the form with the values the user types into the form
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

//function used to add new data to the database
    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/addressbook', formData);
            toast.success("Contact created successfully");
        } catch (error) {
            toast.error("Error creating contact");
        }
        values = {};
    };

//function used to delete data from the database
    const deleteContact = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('/addressbook', { 
                data: { 
                    //user_pk: formData.user_pk, 
                    user_pk: 1,
                    name: formData.name, 
                    email: formData.email, 
                    address: formData.address, 
                    phone: formData.phone 
                } 
            });
            toast.info("Contact deleted successfully");
        } catch (error) {
            toast.error("Error deleting contact.");
        }
        
    };

//funciton used to update the data in the database
    const updateContact = async (e) => {
        e.preventDefault();
        

        //Step 1 is to delete previous data
        try {
            const response = await axios.delete('/addressbook', { 
                data: { 
                    //user_pk: formData.user_pk, 
                    user_pk: 1,
                    name: values.name, 
                    email: values.email, 
                    address: values.address, 
                    phone: values.phone 
                } 
            });
        } catch (error) {
            toast.error("Error updating contact.");
        }
        //Step 2 is to add the updated data
        try {
            const response = await axios.post('/addressbook', formData);
            toast.success("Contact updated successfully");
        } catch (error) {
            toast.error("Error updating contact.");
        }
    }
    
  return (
    <div className="flex justify-center items-center flex-col">
       
        {/* Form with inputs for all the required data to add a new contact */}
        <form onSubmit={postData} className="flex justify-center items-center flex-col p-2">

        <div className = "flex flex-row items-start">
            <div className = "flex flex-col items-start p-4 ">
                <label ><b>Name</b></label>
                <input type="text" value = {formData.name} placeholder = "Albert Gator" name = "name" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <div className = "flex flex-col items-start p-4">
                <label ><b>Email</b></label>
                <input  type="text" value = {formData.email} placeholder = "albert.gator@ufl.edu" name = "email" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
        </div>
        <div className = "flex flex-row items-start">
            <div className = "flex flex-col items-start p-4">
                <label><b>Phone Number</b></label>
                <input type="text" value = {formData.phone} placeholder = "+1 (352) 123-4567" name = "phone" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
            <div className = "flex flex-col items-start p-4">
                <label><b>Address</b> </label>
                <input type="text" value = {formData.address} placeholder = "1 Swamp Ave." name = "address" onChange={updateForm} className = "border border-solid p-2"/>
            </div>
        </div>
            <div className = "flex flex-row items-center p-4 gap-5">
            {/* Logic to show buttons whether it is an add or edit/delete */}
            {!showDelete &&<button  style={{ backgroundColor: '#1d4ed8'}} className=" text-white py-2 px-4 rounded" type="submit">Save New Contact</button>}
            {showDelete && <button onClick = {updateContact} style={{ backgroundColor: '#1d4ed8'}} className=" text-white py-2 px-4 rounded" type="submit">Save Changes</button>}
            {showDelete && <button onClick={deleteContact}  style={{ backgroundColor: '#ef4547'}} className=" text-white py-2 px-4 rounded" >Delete Contact</button>}
            
            </div>
           
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default ContactSubmission