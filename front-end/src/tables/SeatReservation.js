import React, { useEffect } from "react";
import { useParams } from "react-router";
import CancelButton from "../utils/CancelButton";
import SubmitTableButton from "./SubmitTableButton";

function SeatReservation({ table, setTable, tableError, setTableError, reservation }){
    const { reservation_id } = useParams();

    useEffect(() => {

    })

    return(
        <>
            <SubmitTableButton table={table} setTable={setTable} setTableError={setTableError}/>
            <CancelButton />
        </>
    )
}

export default SeatReservation;