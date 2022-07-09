import React from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { postTable, seatTable, updatenewStatus } from "../utils/api";

function SubmitTableButton({ table, setTable, setTableError }){
    const history = useHistory();
    const location = useLocation();
    const { reservation_id } = useParams();
    let onSeatPage = false;

    //onSeatPage boolean decides whether button should create a table or update a table
    if(location.pathname === `/reservations/${reservation_id}/seat`) onSeatPage = true;
    
    //New Table - handles API POST
    function createTable(newTable){
        const abortController = new AbortController();
        setTableError(null);
        postTable(newTable, abortController.signal)
            .catch(setTableError)
        return () => abortController.abort();
    };

    //Update table - handles API PUT
    function updateTable(table_id, reservation_id, newStatus){
        const abortController = new AbortController();
        setTableError(null);
        seatTable(table_id, reservation_id, newStatus, abortController.signal)
            .catch(setTableError);
        return () => abortController.abort();
    };

    //POST & PUT submit event
    const handleSubmit = (event) => {
        event.preventDefault();
        //Reset error state
        setTableError(null);

        if(onSeatPage === false && table.table_name !== null && Number(table.capacity) > 0){
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
            const newStatus = "seated";
            //API call
            updateTable(table_id, reservation_id, newStatus);
        };
        //Resets table state
        setTable({
            table_id: null,
            table_name: "",
            capacity: 0,
            reservation_id: null
        });
        //returns us to dashboard
        history.push(`/dashboard`);
        history.go(0); 
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitTableButton;