import React from "react";
import { useLocation } from "react-router";
//import { formatAsTime } from "../utils/date-time";
import SeatButton from "./SeatButton";

function FormatReservation({ first_name, last_name, people, reservation_id, reservation_time, reservation }){
  //const reformatTime = formatAsTime(reservation_time);
  const location = useLocation();
  let onSeatPage = false;

  if(location.pathname == `/reservations/${reservation_id}/seat`) onSeatPage = true;

  return(
  <div key={reservation_id}>
      <h6>{first_name} {last_name}</h6>
      <p>{reservation_time}</p>
      <p>Party Size: {people}</p>
      {console.log(onSeatPage)}
      {!onSeatPage && <SeatButton reservation_id={reservation_id}/>}
  </div>
  );
}

export default FormatReservation;