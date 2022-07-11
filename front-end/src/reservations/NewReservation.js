import React, { useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation({ reservation, setReservation, resError, setResError }){
    useEffect(() =>{
        setReservation({
            first_name: "",
            last_name: "",
            mobile_number: "",
            reservation_date: "",
            reservation_time: "",
            people: 0,
            status: ""
        });
    }, [setReservation]);

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