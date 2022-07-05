import React from "react";
import { formatAsTime } from "../utils/date-time";
import SeatButton from "./SeatButton";

function FormatReservation(res, { setReservation }){
  const { first_name, last_name, people, reservation_id, reservation_time } = res;
  //if(!reservation_id) return null;

  const reformatTime = formatAsTime(reservation_time);

  return(
  <div key={reservation_id}>
      <h6>{first_name} {last_name}</h6>
      <p>{reformatTime}</p>
      <p>Party Size: {people}</p>
      <SeatButton res={res} setReservation={setReservation}/>
  </div>
  );
}

export default FormatReservation;