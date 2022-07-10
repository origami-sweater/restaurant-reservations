import React, { useEffect } from "react";
import { useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation({ reservation, setReservation, resError, setResError }){
    const { reservation_id } = useParams();

    useEffect(loadReservation, [reservation_id, setResError, setReservation]);

    function loadReservation(){
        const abortController = new AbortController();
        setResError(null);
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setResError);
        return () => abortController.abort();
    };

    return(
        <>
            <h2>Edit Reservation</h2>
            <div className="d-md-flex mb-3">
                <p className="mb-0">Reservation cancellations can only be performed from the dashboard.</p>
            </div>
            <ErrorAlert error={resError} />
            <ReservationForm reservation={reservation} setReservation={setReservation} setResError={setResError} />
        </>
    );
}

export default EditReservation;