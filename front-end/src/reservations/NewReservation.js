import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

function NewReservation(){
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
            <ReservationForm reservation={reservation} setReservation={setReservation} />
        </>
    );
}

export default NewReservation;