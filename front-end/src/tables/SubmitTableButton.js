import React from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { postTable, seatTable } from "../utils/api";

function SubmitTableButton({ table, setTable, setTableError }){
    const history = useHistory();
    const location = useLocation();
    const { reservation_id } = useParams();
    let onSeatPage = false;

    //onSeatPage boolean decides whether button should create a table or update a table
    if(location.pathname === `/reservations/${reservation_id}/seat`) onSeatPage = true;
    
    //New Table - handles API POST
    async function createTable(newTable){
        const abortController = new AbortController();
        setTableError(null);
        try{
            await postTable(newTable, abortController.signal);
            setTable({
                table_id: null,
                table_name: "",
                capacity: 0,
                reservation_id: null
            });
            history.push(`/dashboard`);
        } catch(error) {
            setTableError(error);
        };
        return () => abortController.abort();
    };

    //Update table - handles API PUT
    async function updateTable(table_id, reservation_id, newStatus){
        const abortController = new AbortController();
        setTableError(null);
        setTableError(null);
        try{
            await seatTable(table_id, reservation_id, newStatus, abortController.signal);
            setTable({
                table_id: null,
                table_name: "",
                capacity: 0,
                reservation_id: null
            });
            history.push(`/dashboard`);
        } catch(error) {
            setTableError(error);
        };
        return () => abortController.abort();
    };

    //POST & PUT submit event
    const handleSubmit = (event) => {
        event.preventDefault();
        if(onSeatPage === false && table.table_name !== null && Number(table.capacity) > 0){
            //POST - Create Table behavior
            const newTable = {
                table_name: table.table_name,
                capacity: Number(table.capacity) 
            };
            createTable(newTable);
        } else {
            //PUT - Update Table behavior
            const table_id = table.table_id;
            const newStatus = "seated";
            updateTable(table_id, reservation_id, newStatus);
        };
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitTableButton;