import React from "react";
import { useHistory } from "react-router";
import { unseatTable, listTables, updateStatus } from "../utils/api";

function FinishButton({ table, setTables, setTableError, setTablesError, setReservationsError, tableError, reservationsError }){
    const { table_id, reservation_id } = table;
    const history = useHistory();

    function endReservation(reservation_id, table_id, tableError, reservationsError){
        const abortController = new AbortController();
        const newStatus = "finished"
        setTableError(null);
        setTablesError(null);
        unseatTable(table_id, abortController.signal)
            .catch(setTableError);
        if(tableError === null){
            updateStatus(newStatus, reservation_id, abortController.signal)
                .catch(setReservationsError);
        };
        if(tableError === null && reservationsError === null){
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
            endReservation(reservation_id, table_id, tableError, reservationsError);
        };
    };

    return(
        <td>
            <button type="finish" data-table-id-finish={table.table_id} className="btn btn-primary ml-2" onClick={onFinish}>Finish</button>
        </td>
    )
}

export default FinishButton;