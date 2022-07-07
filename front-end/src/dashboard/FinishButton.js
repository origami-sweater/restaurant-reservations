import React from "react";
import { unseatTable, listTables } from "../utils/api";

function FinishButton({ table, setTables, tableError, setTableError, setTablesError }){
    const { table_id } = table;

    const endReservation = () => {
        const abortController = new AbortController();
        setTableError(null);
        setTablesError(null);
        unseatTable(table_id, abortController.signal)
            .catch(setTableError);
        listTables(abortController.signal)
            .then(setTables)
            //.then(window.location.reload(true))
            .catch(setTablesError);
        return () => abortController.abort();
    };

    const onFinish = (event) => {
        event.preventDefault();
        if(window.confirm("Is the table ready to seat new guests? This cannot be undone.") === true){
            endReservation();
            console.log(tableError)
        };
    };

    return(
        <>
            <button type="finish" data-table-id-finish={table.table_id} className="btn btn-primary ml-2" onClick={onFinish}>Finish</button>
        </>
    )
}

export default FinishButton;