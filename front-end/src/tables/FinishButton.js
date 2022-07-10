import React from "react";
import { useHistory } from "react-router";
import { unseatTable, listTables, updateStatus } from "../utils/api";

function FinishButton({ table, setTables, setTableError }){
    const { table_id, reservation_id } = table;
    const history = useHistory();

    async function endReservation(reservation_id, table_id){
        const abortController = new AbortController();
        const newStatus = "finished"
        setTableError(null);
        try{
            await updateStatus(newStatus, reservation_id, abortController.signal);
            await unseatTable(table_id, abortController.signal);
            const refreshTables = await listTables(abortController.signal);
            setTables(refreshTables);
            history.go(0);
        } catch(error) {
            setTableError(error);
        };
        return () => abortController.abort();
    };

    const onFinish = (event) => {
        event.preventDefault();
        if(window.confirm("Is the table ready to seat new guests? This cannot be undone.") === true){
            endReservation(reservation_id, table_id);
        };
    };

    return(
        <td>
            <button type="finish" data-table-id-finish={table.table_id} className="btn btn-primary ml-2" onClick={onFinish}>Finish</button>
        </td>
    )
}

export default FinishButton;