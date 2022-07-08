import React from "react";
import CancelButton from "../utils/CancelButton";
import handleFormChange from "../utils/handleFormChange";
import SubmitTableButton from "./SubmitTableButton";

function TableForm({ table, setTable, setTableError }){

    return(
        <form>
            <label htmlFor="table_name">
                Table Name:
                <input
                    name="table_name"
                    type="text"
                    id="table_name"
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                    value={table.table_name}
                />
            </label>
            <label htmlFor="capacity">
                Capacity:
                <input
                    name="capacity"
                    type="text"
                    id="capacity" 
                    onChange={({target}) => handleFormChange({target, table, setTable})}
                    value={table.capacity}
                />
            </label>
            <SubmitTableButton table={table} setTable={setTable} setTableError={setTableError}/>
            <CancelButton />
        </form>
    );
}

export default TableForm;