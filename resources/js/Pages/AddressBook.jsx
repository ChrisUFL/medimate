import React from 'react';
import Navbar from '../Components/Navbar'
import Contact from '../Components/Contact';
import "../../css/app.css"

const data = {
    name : "KJ OBrien",
    email : "kj@gmail.com",
    phone: "+1 (561) 555-5555",
    address : "123 Main Street"

}


const AddressBook = () => {
    return (
        <div>
            <Navbar />
            <div class = "flex justify-center items-center flex-col">
                <input class = "border border-solid rounded-md w-4/5 p-4 m-4" type="text" placeholder = "Search..."/>
                <table class="w-4/5 table-auto border rounded-lg  border-gray-400">
                    <tr class="bg-blue-700 text-white border rounded-lg">
                        <th class="border border-gray-400 px-3 py-2">Name</th>
                        <th class="border border-gray-400 px-3 py-2">Email</th>
                        <th class="border border-gray-400 px-3 py-2">Phone Number</th>
                        <th class="border border-gray-400 px-3 py-2">Address</th>
                    </tr>
                    <Contact contact_data = {data}></Contact>

                </table>
            </div>
        </div>
    );
};

export default AddressBook;
