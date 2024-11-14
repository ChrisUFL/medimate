import React, {
    useState,
  } from "react";
import Navbar from '../Components/Navbar'
import ContactSubmission from '../Components/ContactSubmission'
import { Modal, Box } from '@mui/material';
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
    console.log(contacts);
    const [rowData] = useState(contacts);
    const[quickFilterText, setQuickFilterText]= useState(null);
    const[modalOpen, changeModalOpen]= useState(false);
    const[nameDefault, setNameDefault]= useState('');
    const[addressDefault, setAddressDefault]= useState('');
    const[phoneDefault, setPhoneDefault]= useState('');
    const[emailDefault, setEmailDefault]= useState('');

    const [open, toggleModal] = useState(false);
    const changeModalState = () => {
        console.log(modalOpen)
        toggleModal(!open);
        if(modalOpen){
            setNameDefault('');
            setEmailDefault('');
            setPhoneDefault('');
            setAddressDefault('');
            changeModalOpen(false);
        }
        
        
    }
    
    const [columnDefs] = useState([
       
        { field: 'name', headerName: 'Name', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'phone', headerName: 'Phone', flex: 1, filter: 'agTextColumnFilter'},
        { field: 'address', headerName: 'Address', flex: 1,filter: 'agTextColumnFilter' },
        { headerName: 'Edit',   flex: 0.25,checkboxSelection: true }
      ]);
    
    const filterData = (e)=>{
        setQuickFilterText(e.target.value);  
    }

    const gridOptions = {
        rowHeight: 50,
        headerHeight: 50,
    }
    const editRow = (event) => {
        const row = event.api.getSelectedRows();
        setNameDefault(row[0].name);
        setEmailDefault(row[0].email);
        setPhoneDefault(row[0].phone);
        setAddressDefault(row[0].address);
        changeModalState();
        event.api.deselectAll();
        changeModalOpen(true);
    };

    return (

        <div>

            <Navbar />
            <Modal  open={open} onClose={changeModalState} >                
            <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        border: '2px solid #1d4ed8',
                        padding: 5,
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '0.375rem',
                    }}
                >
                    <div className = "w-full">
                        <h1 className="cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center p-2 float-right" onClick={changeModalState} style={{ backgroundColor: '#1d4ed8'}}><b>X</b></h1>
                    </div>
                    <ContactSubmission values={{ name: nameDefault, email: emailDefault, phone: phoneDefault, address : addressDefault }} />
                </Box>
                
            </Modal>
            <div className = "flex justify-center items-center flex-row ">
                <div className = "flex justify-between items-center flex-row  w-4/5">
                    <input onChange = {filterData}className = "border border-solid rounded-md w-full p-4 mr-4" type="text" placeholder = "Search..."/>
                    <button onClick = {changeModalState} className="border border-solid rounded-md p-4 text-white bg-[#1d4ed8] whitespace-nowrap"> Add New Contact </button>

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
                        onSelectionChanged={editRow}
                    />
                </div>
            
            </div>
        </div>
    );
};

export default AddressBook;
