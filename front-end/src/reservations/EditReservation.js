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
            <h1>Edit Reservation</h1>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">If you wish to cancel the reservation, please return to the dashboard.</h4>
            </div>
            <ErrorAlert error={resError} />
            <ReservationForm reservation={reservation} setReservation={setReservation} setResError={setResError} />
        </>
    );
}

export default EditReservation;