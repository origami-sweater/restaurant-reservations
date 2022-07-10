import React from "react";
import handleFormChange from "../utils/handleFormChange";
import CancelButton from "../utils/CancelButton";
import SubmitReservationButton from "./SubmitReservationButton";

function ReservationForm({ reservation, setReservation, setResError, resError }){

    return(
        <form>
            <label htmlFor="first_name">
                First Name:
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.first_name}
                />
            </label>
            <label htmlFor="last_name">
                Last Name:
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.last_name}
                />
            </label>
            <label htmlFor="mobile_number">
                Phone Number:
                <input
                    type="tel"
                    id="mobile_number"
                    name="mobile_number"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.mobile_number}
                />
            </label>
            <label htmlFor="reservation_date">
                Reservation Date:
                <input
                    id="reservation_date"
                    name="reservation_date"
                    placeholder="YYYY-MM-DD"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.reservation_date}
                />
            </label>
            <label htmlFor="reservation_time">
                Reservation Time:
                <input
                    type="time"
                    id="reservation_time"
                    name="reservation_time"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.reservation_time}
                />
            </label>
            <label htmlFor="people">
                Party Size:
                <input
                    type="number"
                    min="0"
                    id="people"
                    name="people"
                    onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                    value={reservation.people}
                />
            </label>
            <SubmitReservationButton reservation={reservation} resError={resError} setReservation={setReservation} setResError={setResError}/>
            <CancelButton setReservation={setReservation} reservation={reservation}/>
        </form>
    );
}

export default ReservationForm;