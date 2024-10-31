import React, {
    useState,
  } from "react";
import Navbar from '../Components/Navbar'
import ContactSubmission from '../Components/ContactSubmission'
import { Modal, Box, Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css'; 
import "../../css/app.css"

 
const data = [
    {
        name : "KJ OBrien",
        email : "kj@gmail.com",
        phone: "+1 (561) 555-5555",
        address : "123 Main Street"
    },
    {
        name : "Reed Books",
        email : "rbooks@gmail.com",
        phone: "+1 (561) 123-4567",
        address : "0 Binary Lane"
    },
    {
        name : "Billy Napier",
        email : "bnapier@ufl.com",
        phone: "+1 (352) 462-1958",
        address : "5 Swamp Blvd"
    }   
]


const AddressBook = ({contacts}) => {
    const [rowData] = useState(contacts);
    const[quickFilterText, setQuickFilterText]= useState(null);
    const [open, toggleModal] = useState(false);
    const changeModalState = () => {
        toggleModal(!open);
    }
    
    const [columnDefs] = useState([
        { field: 'name', headerName: 'Name', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'phone', headerName: 'Phone', flex: 1, filter: 'agTextColumnFilter'},
        { field: 'address', headerName: 'Address', flex: 1,filter: 'agTextColumnFilter' }
      ]);
    
    const filterData = (e)=>{
        setQuickFilterText(e.target.value);  
    }

    const gridOptions = {
        rowHeight: 50,
        headerHeight: 50,
    }

    return (

        <div>

            <Navbar />
            <Modal open={open} onClose={changeModalState}>
                <ContactSubmission/>
            </Modal>
            <div class = "flex justify-center items-center flex-row ">
                <div class = "flex justify-between items-center flex-row  w-4/5">
                    <input onChange = {filterData}class = "border border-solid rounded-md w-full p-4 mr-4" type="text" placeholder = "Search..."/>
                    <button onClick = {changeModalState} class="border border-solid rounded-md p-4 text-white bg-[#1d4ed8] whitespace-nowrap"> Add New Contact </button>

                </div>
            </div>
            <div>
                <div className="ag-theme-balham flex flex-col"  style={{ width: '80%', margin: '20px auto', height: '65vh' }}>
                    <AgGridReact 
                        quickFilterText={quickFilterText}
                        rowData={rowData}  
                        columnDefs={columnDefs}
                        pagination={true}              
                        domLayout="normal"
                        paginationPageSize={7}
                        gridOptions={gridOptions}
                    />
                </div>
            
            </div>
        </div>
    );
};

export default AddressBook;
