import React from "react";
import { useHistory } from "react-router";
import { unseatTable, listTables } from "../utils/api";

function FinishButton({ table, setTables, setTableError }){
    const { table_id, reservation_id } = table;
    const history = useHistory();

    async function endReservation(reservation_id, table_id){
        const abortController = new AbortController();
        const newStatus = "finished";
        console.log(table_id, reservation_id, table, newStatus);
        setTableError(null);
        try{
            await unseatTable(table_id, abortController.signal);
            try{
                const refreshTables = await listTables(abortController.signal);
                setTables(refreshTables);
                history.go(0);
            } catch(error) {
                setTableError(error);
            };
        } catch(error) {
            setTableError(error);
        };
        return () => abortController.abort();
    };

    const onFinish = (event) => {
        event.preventDefault();
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.") === true){
            endReservation(reservation_id, table_id);
        };
    };

    return(
        <td>
            <button type="finish" 
                data-table-id-finish={table.table_id} className="btn btn-danger btn-sm" onClick={onFinish}>Finish</button>
        </td>
    )
}

export default FinishButton;