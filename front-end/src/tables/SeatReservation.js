import React, { useEffect } from "react";
import { useParams } from "react-router";
import { listTables, readReservation } from "../utils/api";
import CancelButton from "../utils/CancelButton";
import SubmitTableButton from "./SubmitTableButton";
import FormatReservation from "../dashboard/FormatReservation";

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
    const { reservation_id } = useParams();

    useEffect(loadSeats, [reservation_id, setResError, setReservation, setTables, setTablesError]);

    function loadSeats(){
        const abortController = new AbortController();
        setResError(null);
        setTablesError(null);
        //API call verifying reservation information
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setResError);
        //API call for tables to ensure looking at most up-to-date information
        listTables(abortController.signal)
          .then(setTables)
          .catch(setTablesError);
        return () => abortController.abort();
    };

    const tableOptions = tables.map((table) => {
        if(Number(table.capacity) >= Number(reservation.people) && table.reservation_id == null){
            return(
                <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                </option>
            );
        } else {
            return null;
        };
    });

    const onTableSelect = ({ target }) =>{
        setTable({
            table_id: target.value,
            table_name: "",
            capacity: 1,
            reservation_id: null
        });
    };

    return(
        <>
            <FormatReservation 
                first_name={reservation.first_name}
                last_name={reservation.last_name}
                people={reservation.people}
                reservation_id={reservation_id}
                reservation_time={reservation.reservation_time} 
            />
            <select name="table_id" onChange={onTableSelect}>
                <option default>Select Table</option>
                {tableOptions}
            </select>
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