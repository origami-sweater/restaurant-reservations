import React from "react";
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable({ table, setTable, tableError, setTableError }){

    return(
        <div>
            <h2>New Table</h2>
            <div className="d-md-flex mb-3">
                <p className="mb-0">Please enter the new table's information.</p>
            </div>
            <ErrorAlert error={tableError} />
            <TableForm table={table} setTable={setTable} setTableError={setTableError} />
        </div>
    );
}

export default NewTable;