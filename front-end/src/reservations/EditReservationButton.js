import React from "react";
import { Link } from "react-router-dom";

function EditReservationButton({ reservation_id }){

    return(
        <>
            <Link to={`/reservations/${reservation_id}/edit`} className="btn btn-secondary">Edit</Link>
        </>
    );
}

export default EditReservationButton;