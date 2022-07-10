import React from "react";
import { useLocation } from "react-router";
import CancelReservationButton from "./CancelReservationButton";
import EditReservationButton from "./EditReservationButton";
//import { formatAsTime } from "../utils/date-time";
import SeatButton from "./SeatButton";

function FormatReservation({ first_name, last_name, people, reservation_id, reservation_time, status, setResError }){
  //const reformatTime = formatAsTime(reservation_time);
  const location = useLocation();
  let onSeatPage = false;
  //checks if buttons should display based on url
  if(location.pathname === `/reservations/${reservation_id}/seat`) onSeatPage = true;

  return(
  <div key={reservation_id}>
      <h5 className="mb-0">{first_name} {last_name}</h5>
      <p className="mb-0">Reservation Time: {reservation_time}</p>
      <p className="mb-0">Party Size: {people}</p>
      <p data-reservation-id-status={reservation_id} className="mb-1">Status: {status}</p>
      {!onSeatPage && <EditReservationButton reservation_id={reservation_id} />}
      {!onSeatPage && status === "booked" && <SeatButton reservation_id={reservation_id}/>}
      {!onSeatPage && <CancelReservationButton reservation_id={reservation_id} setResError={setResError}/>}
  </div>
  );
}

export default FormatReservation;