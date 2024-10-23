import React, {
    useState,
  } from "react";
import Navbar from '../Components/Navbar'
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
            <div class = "flex justify-center items-center flex-row ">
            <div class = "flex justify-between items-center flex-row  w-4/5">
                <input onChange = {filterData}class = "border border-solid rounded-md w-full p-4 mr-4" type="text" placeholder = "Search..."/>
                <button class="border border-solid rounded-md p-4 text-white bg-[#1d4ed8] whitespace-nowrap"> Add New Contact </button>

            </div>
            </div>
            <div>
                <div class = "flex flex-col h-screen"className="ag-theme-balham" style={{ width: '80%', margin: '20px auto' }}>
                    <AgGridReact 
                        quickFilterText={quickFilterText}
                        rowData={rowData}  
                        columnDefs={columnDefs}
                        pagination={true}              
                        domLayout="autoHeight"
                        paginationPageSize={7}
                        gridOptions={gridOptions}
                    />
                </div>
            
            </div>

        </div>
    );
};

export default AddressBook;
