import React, { useState } from "react";
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable(){
    const [tableError, setTableError] = useState(null);
    const [table, setTable] = useState({
            table_name: "",
            capacity: 1
    });

    return(
        <>
            <h2>Create New Table:</h2>
            <ErrorAlert error={tableError} />
            <TableForm table={table} setTable={setTable} setTableError={setTableError} />
        </>
    );
}

export default NewTable;