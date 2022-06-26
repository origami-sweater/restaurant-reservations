import React from "react";
import { useHistory } from "react-router";
import { postReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function SubmitButton({ reservation, setReservation }){
    const history = useHistory();
    //const {}= useParams();

    //New Reservation - handles push to server & validates form fields not null
    async function createReservation(newRes){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            //api call to "POST"
            await postReservation(newRes, signal);
            //sends us to new reservation's page
            history.push(`/dashboard?date=${newRes.reservation_date}`)
            history.go(0); 
        } catch(err) {
            console.log(err.name)
        };
    };


    //POST ONLY CURRENTLY - reformats reservation saved to state to match table data
    const handleSubmit = (event) => {
        event.preventDefault();
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
                people: Number(reservation.people) 
            }
            //makes sure date and time are formatted correctly for table
            formatReservationDate(newRes);
            formatReservationTime(newRes);
            createReservation(newRes);
            //resets form states
            setReservation({
                first_name: "",
                last_name: "",
                mobile_number: "",
                reservation_date: "",
                reservation_time: "",
                people: 1
            });
        };
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitButton;