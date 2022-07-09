import React from "react";
import { Link } from "react-router-dom";

function SeatButton({ reservation_id }){

    return(
        <>
            <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-secondary">Seat</Link>
        </>
    );
}

export default SeatButton;