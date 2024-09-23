import React from 'react';
import Navbar from '../Components/Navbar'
import Contact from '../Components/Contact';
import "../../css/AddressBook.css"


const AddressBook = () => {
    return (
        <div>
            <Navbar />
            <div class = "page">

                    <input class = "search"vtype="text" placeholder = "Search..."/>
                <div class = "address-container">
                    <table class="table-auto w-full border rounded-bg border-gray-400">
                        <tr class="bg-blue-700 text-white rounded-sm">
                            <th class="border border-gray-400 px-3 py-2">Name</th>
                            <th class="border border-gray-400 px-3 py-2">Email</th>
                            <th class="border border-gray-400 px-3 py-2">Phone Number</th>
                            <th class="border border-gray-400 px-3 py-2">Address</th>
                        </tr>
                        <Contact></Contact>
                        <Contact></Contact>
                        <Contact></Contact>
                        <Contact></Contact>
                        
                    </table>
                    
                   
                </div>
                
            </div>
            
        </div>
    );
};

export default AddressBook;
