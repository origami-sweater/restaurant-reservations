import React from "react";
import { useHistory, useLocation } from "react-router";
import { postTable, seatTable } from "../utils/api";

function SubmitTableButton({ table, setTable, setTableError, reservation }){
    const history = useHistory();
    const location = useLocation();
    const reservation_id = reservation.reservation_id;
    let onSeatPage = false;

    //onSeatPage boolean decides whether button should create a table or update a table
    if(location.pathname === `/reservations/${reservation_id}/seat`) onSeatPage = true;

    //New Table - handles API POST
    async function createTable(newTable){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            await postTable(newTable, signal);
            //sends us to dashboard
            history.push(`/dashboard`)
            history.go(0); 
        } catch(err) {
            console.log(err.name);
            setTableError(err);
        };
    };

    //Update table - handles API PUT
    async function updateTable(table_id, reservation_id){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            await seatTable(table_id, reservation_id, signal);
            //sends us to dashboard
            history.push(`/dashboard`)
            history.go(0); 
        } catch(err) {
            console.log(err.name);
            setTableError(err);
        };
    };

    //POST & PUT submit event
    const handleSubmit = (event) => {
        event.preventDefault();
        //Reset error state
        setTableError(null);

        if(onSeatPage === false){
            //POST - Create Table behavior
            const newTable = {
                table_name: table.table_name,
                capacity: Number(table.capacity) 
            };
            //API call
            createTable(newTable);
        } else {
            //PUT - Update Table behavior
            const table_id = table.table_id;
            //API call
            updateTable(table_id, reservation_id);
        };
        //Resets table state
        setTable({
            table_id: null,
            table_name: "",
            capacity: 1,
            reservation_id: null
        });
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitTableButton;