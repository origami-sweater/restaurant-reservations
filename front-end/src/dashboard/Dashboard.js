import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import DateButtons from "./DateButtons";
import FormatReservation from "./FormatReservation";
import FormatTable from "./FormatTable";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import { listReservations, listTables } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, tables, setTables, tablesError, setTablesError, tableError, setTableError }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();

  //useEffect hooks 
  useEffect(() => {
    const dateQuery = query.get("date");
    if(dateQuery){
      setDate(dateQuery);
    } else {
      setDate(today()); //in case state can't be reset after query
    };
  }, [setDate, query]);

  useEffect(loadDashboard, [date, setTables, setTablesError])

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
    const { first_name, last_name, people, reservation_id, status, reservation_time } = reservation;
    return <FormatReservation 
      key={reservation_id}
      first_name={first_name}
      last_name={last_name}
      people={people}
      reservation_id={reservation_id}
      reservation_time={reservation_time} 
      status={status}
    />;
  });
  const showTables = tables.map((table) => {
    return <FormatTable 
        key={table.table_id}
        table={table} 
        setTables={setTables} 
        tableError={tableError}
        setTableError={setTableError} 
        setTablesError={setTablesError}
      />;
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <DateButtons date={date} setDate={setDate}/>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Reservations for ${date}`}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={tableError} />
      <div className="container fluid">{showReservations}</div>
      <table className="container fluid">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Finish?</th>
          </tr>
        </thead>
        <tbody>
          {showTables}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
