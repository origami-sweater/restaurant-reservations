import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation(){
    const [resError, setResError] = useState(null);
    const [reservation, setReservation] = useState({
            first_name: "",
            last_name: "",
            mobile_number: "",
            reservation_date: "",
            reservation_time: "",
            people: 1
    });

    return(
        <>
            <h2>Submit New Reservation:</h2>
            <ErrorAlert error={resError} />
            <ReservationForm reservation={reservation} setReservation={setReservation} setResError={setResError} />
        </>
    );
}

export default NewReservation;