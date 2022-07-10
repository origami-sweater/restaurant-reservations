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
            <label htmlFor="table_name">
                Table Name:
                <input
                    name="table_name"
                    type="text"
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                />
            </label>
            <label htmlFor="capacity">
                Capacity:
                <input
                    name="capacity"
                    type="text"
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                />
            </label>
            <SubmitTableButton table={table} setTable={setTable} setTableError={setTableError}/>
            <CancelButton setTable={setTable} table={table}/>
        </form>
    );
}

export default TableForm;