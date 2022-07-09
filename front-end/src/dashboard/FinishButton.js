import React from "react";
import { useHistory } from "react-router";
import { unseatTable, listTables } from "../utils/api";

function FinishButton({ table, setTables, tableError, setTableError, setTablesError }){
    const { table_id } = table;
    const history = useHistory();

    const endReservation = () => {
        const abortController = new AbortController();
        setTableError(null);
        setTablesError(null);
        unseatTable(table_id, abortController.signal)
            .catch(setTableError);
        if(tableError === null){
            listTables(abortController.signal)
                .then(setTables)
                .then(() => history.go(0))
                .catch(setTablesError);
        };
        return () => abortController.abort();
    };

    const onFinish = (event) => {
        event.preventDefault();
        if(window.confirm("Is the table ready to seat new guests? This cannot be undone.") === true){
            endReservation();
        };
    };

    return(
        <td>
            <button type="finish" data-table-id-finish={table.table_id} className="btn btn-primary ml-2" onClick={onFinish}>Finish</button>
        </td>
    )
}

export default FinishButton;