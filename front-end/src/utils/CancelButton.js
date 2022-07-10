import React from "react";
import { useHistory } from "react-router-dom";

//Currently only set up for POST - Create Reservation
function CancelButton({ setReservation, reservation, table, setTable }) {
    const history = useHistory();

    const handleCancel = (event) => {
        event.preventDefault();
        if(reservation){
            setReservation({
                first_name: "",
                last_name: "",
                mobile_number: "",
                reservation_date: "",
                reservation_time: "",
                people: 0,
                status: ""
            });
        } else if(table) {
            setTable({
                table_id: null,
                table_name: "",
                capacity: 0,
                reservation_id: null
            });
        };
        history.goBack();
    }

    return (
        <button type="cancel" className="btn btn-danger ml-2 mt-1" onClick={handleCancel}>Cancel</button>
    );
}

export default CancelButton;