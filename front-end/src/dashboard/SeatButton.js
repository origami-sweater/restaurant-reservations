import React from "react";
import { Link } from "react-router-dom";

function SeatButton(res, { setReservation }){
    const seatClick = (event) =>{
        event.preventDefault();
        setReservation(res);
    };

    return(
        <>
            <Link 
            to={`/reservations/${res.reservation_id}/seat`} 
            className="btn btn-secondary"
            onClick={seatClick}
            >
                Seat
            </Link>
        </>
    );
}

export default SeatButton;