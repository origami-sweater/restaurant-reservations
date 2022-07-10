import React from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation({ reservation, setReservation, resError, setResError }){

    return(
        <>
            <h2>New Reservation</h2>
            <div className="d-md-flex mb-3">
                <p className="mb-0">Please enter the reservation information.</p>
            </div>
            <ErrorAlert error={resError} />
            <ReservationForm reservation={reservation} resError={resError} setReservation={setReservation} setResError={setResError} />
        </>
    );
}

export default NewReservation;