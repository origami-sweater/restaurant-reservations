import React from "react";
import { Link } from "react-router-dom";
//import { useParams } from "react-router-dom/cjs/react-router-dom.min";

//Currently only set up for POST - Create Reservation
function CancelButton() {
    //const {} = useParams();

    /*if (PARAM) {
        return (
            <Link to={`/reservations/${PARAM}`} className="btn btn-secondary">Cancel</Link>
        )
    } else {*/
    return (
        <Link to="/" className="btn btn-secondary">Cancel</Link>
    );
}

export default CancelButton;