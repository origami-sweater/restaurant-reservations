import React from "react";
import { useHistory } from "react-router-dom";

//Currently only set up for POST - Create Reservation
function CancelButton({ setReservation }) {
    const history = useHistory();

    const handleCancel = (event) => {
        event.preventDefault();
        setReservation({
            first_name: "",
            last_name: "",
            mobile_number: "",
            reservation_date: "",
            reservation_time: "",
            people: 0,
            status: ""
        })
        history.goBack();
    }

    return (
        <button type="cancel" className="btn btn-primary ml-2" onClick={handleCancel}>Cancel</button>
    );
}

export default CancelButton;