import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import DateButtons from "./DateButtons";
import FormatReservation from "./FormatReservation";
import FormatTable from "./FormatTable";
import useQuery from "../utils/useQuery";
import { formatAsDate, today } from "../utils/date-time";
import { listReservations, listTables } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, tables, setTables, tablesError, setTablesError }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();

  //useEffect hooks 
  useEffect(() => {
    const dateQuery = query.get("date")
    if(dateQuery){
      setDate(dateQuery);
    } else {
      setDate(today()); //in case state can't be reset after query
    };
  });

  useEffect(loadDashboard, [date])

  //sets dashboard's viewable reservations by date determined from URL
  function loadDashboard(){
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  };

  //functions formatting displayed content
  const showReservations = reservations.map((reservation) => {
    const { first_name, last_name, people, reservation_id, reservation_time } = reservation;
    return <FormatReservation 
      first_name={first_name}
      last_name={last_name}
      people={people}
      reservation_id={reservation_id}
      reservation_time={reservation_time} 
    />;
  });
  const showTables = tables.map((table) => {
    return <FormatTable table={table}/>;
  });
  const reformatDate = formatAsDate(date);



  return (
    <main>
      <h1>Dashboard</h1>
      <DateButtons date={date} setDate={setDate}/>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Reservations for ${reformatDate}`}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div className="container fluid">{showReservations}</div>
      <div className="container fluid">{showTables}</div>
    </main>
  );
}

export default Dashboard;
