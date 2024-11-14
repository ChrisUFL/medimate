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

const AddressBook = ({contacts}) => {

// variables used to perform updating on the page
    const [rowData] = useState(contacts);
    const[quickFilterText, setQuickFilterText]= useState(null);
    const[modalOpen, changeModalOpen]= useState(false);
    const[nameDefault, setNameDefault]= useState('');
    const[addressDefault, setAddressDefault]= useState('');
    const[phoneDefault, setPhoneDefault]= useState('');
    const[emailDefault, setEmailDefault]= useState('');
    const [open, toggleModal] = useState(false);

//opens or closes the modal
    const changeModalState = () => {
        toggleModal(!open);
        if(modalOpen){
            setNameDefault('');
            setEmailDefault('');
            setPhoneDefault('');
            setAddressDefault('');
            changeModalOpen(false);
        }        
    }
    
//default settings for columns in the grid
    const [columnDefs] = useState([
       
        { field: 'name', headerName: 'Name', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'email', headerName: 'Email', flex: 1, filter: 'agTextColumnFilter' },
        { field: 'phone', headerName: 'Phone', flex: 1, filter: 'agTextColumnFilter'},
        { field: 'address', headerName: 'Address', flex: 1,filter: 'agTextColumnFilter' },
        { headerName: 'Edit',   flex: 0.25,checkboxSelection: true }
      ]);

//default settings for rows in the grid
const gridOptions = {
    rowHeight: 50,
    headerHeight: 50,
}
    
//performs filtering on the table based on the search bar
    const filterData = (e)=>{
        setQuickFilterText(e.target.value);  
    }

//call to edit row value. updates the form data with the values in the row
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
            {/* NavBar Default to all pages */}
            <Navbar />
            {/* Modal (pop up) confiruation and set up  */}
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
                    {/*Form used to add, edit, or delete values. For latter two options provides the values of the content in the selected row */}
                    <ContactSubmission values={{ name: nameDefault, email: emailDefault, phone: phoneDefault, address : addressDefault }} />
                </Box>
                
            </Modal>
            {/* Search Bar and Add new Contact implementation and styling */}
            <div className = "flex justify-center items-center flex-row ">
                <div className = "flex justify-between items-center flex-row  w-4/5">
                    <input onChange = {filterData}className = "border border-solid rounded-md w-full p-4 mr-4" type="text" placeholder = "Search..."/>
                    <button onClick = {changeModalState} className="border border-solid rounded-md p-4 text-white bg-[#1d4ed8] whitespace-nowrap"> Add New Contact </button>

                </div>
            </div>
            <div>
                {/* AG Grid settings to display the data from the database in the table */}
                <div className="ag-theme-balham flex flex-col"  style={{ width: '80%', margin: '20px auto', height: '65vh' }}>
                    <AgGridReact 
                        quickFilterText={quickFilterText}
                        rowData={rowData}  
                        columnDefs={columnDefs}
                        pagination={true}              
                        paginationAutoPageSize={true}
                        gridOptions={gridOptions}
                        onSelectionChanged={editRow}
                    />
                </div>
            
            </div>
        </div>
    );
};

export default AddressBook;
