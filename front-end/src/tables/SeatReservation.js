import React, { useEffect } from "react";
import { useParams } from "react-router";
import { listTables, readReservation } from "../utils/api";
import CancelButton from "../utils/CancelButton";
import SubmitTableButton from "./SubmitTableButton";

function SeatReservation({ 
    table, 
    setTable, 
    tableError, 
    setTableError, 
    reservation, 
    setReservation, 
    tables, 
    setTables,
    tablesError,
    setTablesError,
    resError,
    setResError
 }){
    const reservation_id = useParams();

    //useEffect(loadSeats, [reservation_id]);

    function loadSeats(){
        const abortController = new AbortController();
        setResError(null);
        setTablesError(null);
        //API call verifying reservation information
        readReservation({ reservation_id }, abortController.signal)
          .then(setReservation)
          .catch(setResError);
        //API call for tables to ensure looking at most up-to-date information
        listTables(abortController.signal)
          .then(setTables)
          .catch(setTablesError);
        return () => abortController.abort();
    }

    /*const tableOptions = tables.map((table) => {
        return FormatTable(table, reservation_id, people);
    });*/

    return(
        <>
            <SubmitTableButton 
                table={table}
                setTable={setTable}
                tableError={tableError} 
                setTableError={setTableError} 
                reservation={reservation}  
            />
            <CancelButton />
        </>
    )
}

export default SeatReservation;