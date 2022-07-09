import React from "react";
import { useHistory, useLocation } from "react-router";
import { postReservation, updateReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function SubmitReservationButton({ reservation, setReservation, setResError }){
    const history = useHistory();
    const location = useLocation();
    let onEditPage = false;
    const clearRes = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
        status: ""
    };

    //onEditPage boolean decides whether button should create a table or update a table
    if(location.pathname === `/reservations/${reservation.reservation_id}/edit`) onEditPage = true;

    //New Reservation - handles API POST
    function createReservation(newRes){
        const abortController = new AbortController();
        setResError(null);
        postReservation(newRes, abortController.signal)
            .catch(setResError);
        return () => abortController.abort(); 
    };

    //Edit Reservation - handles API PUT
    function changeReservation(updatedRes){
        const abortController = new AbortController();
        setResError(null);
        updateReservation(updatedRes, abortController.signal)
            .catch(setResError)
        return () => abortController.abort(); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //POST - Create Reservation behavior
        if(!reservation.reservation_date){
            window.alert("A reservation date must be entered.");
        } else if(!reservation.reservation_time){
            window.alert("A reservation time must be entered.");
        } else {
            if (onEditPage === false){
                //Executes create
                const newRes = {
                    ...reservation,
                    people: Number(reservation.people),
                    status: "booked" 
                }
                //Makes sure date and time are formatted correctly for table
                formatReservationDate(newRes);
                formatReservationTime(newRes);
                createReservation(newRes);
                //Sends to reservation on dashboard
                history.push(`/dashboard?date=${newRes.reservation_date}`)
                history.go(0);
            } else {
                //Executes update if status is booked
                if(reservation.status !== "booked"){
                    setResError("Only booked reservations can be edited.");
                } else {
                    const updatedRes = {...reservation, people: Number(reservation.people)};
                    formatReservationDate(updatedRes);
                    formatReservationTime(updatedRes);
                    changeReservation(updatedRes);
                    setReservation(clearRes);
                    history.goBack();
                };
            };
        }; 
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitReservationButton;