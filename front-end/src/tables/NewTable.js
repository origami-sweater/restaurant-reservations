import React from "react";
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable({ table, setTable, tableError, setTableError }){

    return(
        <>
            <h2>Create New Table:</h2>
            <ErrorAlert error={tableError} />
            <TableForm table={table} setTable={setTable} setTableError={setTableError} />
        </>
    );
}

export default NewTable;