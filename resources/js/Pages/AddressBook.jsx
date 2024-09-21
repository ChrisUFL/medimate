import React from 'react';
import Navbar from '../Components/Navbar'
import "../../css/AddressBook.css"


const AddressBook = () => {
    return (
        <div>
            <Navbar />
            <div class = "page">

                    <input class = "search"vtype="text" placeholder = "Search..."/>
                <div class = "address-container"></div>
            </div>
        </div>
    );
};

export default AddressBook;
