import React from "react";
import { useHistory } from "react-router";
import { postReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function SubmitReservationButton({ reservation, setReservation, setResError }){
    const history = useHistory();

    //New Reservation - handles API POST
    async function createReservation(newRes){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            await postReservation(newRes, signal);
            //sends us to new reservation's page
            history.push(`/dashboard?date=${newRes.reservation_date}`)
            history.go(0); 
        } catch(err) {
            console.log(err.name);
            setResError(err);
        };
    };

    //POST ONLY CURRENTLY - reformats reservation saved to state to match table data
    const handleSubmit = (event) => {
        event.preventDefault();
        setResError(null);
        //POST - Create Reservation behavior
        if(!reservation.reservation_date){
            window.alert("A reservation date must be entered.");
        } else if(!reservation.reservation_time){
            window.alert("A reservation time must be entered.");
        } else {
            const newRes = {
                first_name: reservation.first_name,
                last_name: reservation.last_name,
                mobile_number: reservation.mobile_number,
                reservation_date: reservation.reservation_date,
                reservation_time: reservation.reservation_time,
                people: Number(reservation.people),
                status: "booked" 
            }
            //Makes sure date and time are formatted correctly for table
            formatReservationDate(newRes);
            formatReservationTime(newRes);
            //API call
            createReservation(newRes);
            //Resets form state
            setReservation({
                first_name: "",
                last_name: "",
                mobile_number: "",
                reservation_date: "",
                reservation_time: "",
                people: 0,
                status: ""
            });
        };
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitReservationButton;