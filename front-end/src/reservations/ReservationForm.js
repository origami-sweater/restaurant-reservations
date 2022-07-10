import React from "react";
import handleFormChange from "../utils/handleFormChange";
import CancelButton from "../utils/CancelButton";
import SubmitReservationButton from "./SubmitReservationButton";

function ReservationForm({ reservation, setReservation, setResError, resError }){

    return(
        <form className="mt-3">
            <div>
                <label htmlFor="first_name" className="input-group flex-nowrap">
                    <span className="input-group-text" id="1">First Name</span>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        aria-label="first_name" 
                        aria-describedby="1"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.first_name}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="last_name" className="input-group flex-nowrap">
                    <span className="input-group-text" id="2">Last Name</span>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        aria-label="last_name" 
                        aria-describedby="2"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.last_name}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="mobile_number" className="input-group flex-nowrap">
                    <span className="input-group-text" id="3">Phone Number</span>
                    <input
                        type="tel"
                        id="mobile_number"
                        name="mobile_number"
                        className="form-control"
                        aria-label="mobile_number" 
                        aria-describedby="3"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.mobile_number}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="reservation_date" className="input-group flex-nowrap">
                    <span className="input-group-text" id="4">Reservation Date</span>
                    <input
                        id="reservation_date"
                        name="reservation_date"
                        className="form-control"
                        aria-label="reservation_date" 
                        aria-describedby="4"
                        placeholder="YYYY-MM-DD"
                        type="date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.reservation_date}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="reservation_time" className="input-group flex-nowrap">
                    <span className="input-group-text" id="5">Reservation Time</span>
                    <input
                        type="time"
                        id="reservation_time"
                        name="reservation_time"
                        className="form-control"
                        aria-label="reservation_time" 
                        aria-describedby="5"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.reservation_time}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="people" className="input-group flex-nowrap">
                    <span className="input-group-text" id="6">Party Size</span>
                    <input
                        type="number"
                        min="0"
                        id="people"
                        name="people"
                        className="form-control"
                        aria-label="people" 
                        aria-describedby="6"
                        onChange={({target}) => handleFormChange({target, reservation, setReservation})}
                        value={reservation.people}
                    />
                </label>
            </div>
            <SubmitReservationButton reservation={reservation} resError={resError} setReservation={setReservation} setResError={setResError}/>
            <CancelButton setReservation={setReservation} reservation={reservation}/>
        </form>
    );
}

export default ReservationForm;