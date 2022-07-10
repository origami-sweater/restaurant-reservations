import React from "react";
import CancelButton from "../utils/CancelButton";
import handleFormChange from "../utils/handleFormChange";
import SubmitTableButton from "./SubmitTableButton";

function TableForm({ table, setTable, setTableError }){
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log("Submitted");
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="table_name" className="input-group flex-nowrap">
                <span className="input-group-text" id="1">Table Name</span> 
                <input
                    name="table_name"
                    type="text"
                    className="form-control"
                    aria-label="table_name" 
                    aria-describedby="1"
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                />
            </label>
            <label htmlFor="capacity" className="input-group flex-nowrap">
                <span className="input-group-text" id="2">Capacity</span> 
                <input
                    name="capacity"
                    type="text"
                    className="form-control"
                    aria-label="capacity" 
                    aria-describedby="2"
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                />
            </label>
            <SubmitTableButton table={table} setTable={setTable} setTableError={setTableError}/>
            <CancelButton setTable={setTable} table={table}/>
        </form>
    );
}

export default TableForm;