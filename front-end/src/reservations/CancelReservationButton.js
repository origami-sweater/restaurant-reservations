import React from "react";
import { useHistory } from "react-router";
import { updateStatus } from "../utils/api";

function CancelReservationButton({ reservation_id, setResError }){
    const history = useHistory();

    async function cancelReservation(reservation_id, newStatus){
        const abortController = new AbortController();
        setResError(null);
        try{
            await updateStatus(reservation_id, newStatus, abortController.signal);
        } catch(error) {
            setResError(error);
        };
        return () => abortController.abort();
    };

    const onCancelRes = (event) => {
        event.preventDefault();
        if(window.confirm("Do you want to cancel this reservation? This cannot be undone.") === true){
            const newStatus = "cancelled";
            cancelReservation(reservation_id, newStatus);
            history.go(0)
        };
    };

    return(
        <>
            <button type="cancel" data-reservation-id-cancel={reservation_id} className="btn btn-primary ml-2" onClick={onCancelRes}>Cancel</button>
        </>
    )
}

export default CancelReservationButton;