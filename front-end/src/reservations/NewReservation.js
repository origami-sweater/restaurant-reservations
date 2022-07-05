import React from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation({ reservation, setReservation, resError, setResError }){

    return(
        <>
            <h2>Submit New Reservation:</h2>
            <ErrorAlert error={resError} />
            <ReservationForm reservation={reservation} setReservation={setReservation} setResError={setResError} />
        </>
    );
}

export default NewReservation;