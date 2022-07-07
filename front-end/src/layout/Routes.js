import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import SeatReservation from "../tables/SeatReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const defaultDay = today();
  const [date, setDate] = useState(defaultDay);

  //Reservation states
  const [resError, setResError] = useState(null);
  const [reservation, setReservation] = useState({
          first_name: "",
          last_name: "",
          mobile_number: "",
          reservation_date: "",
          reservation_time: "",
          people: 1
  });

  //Table states
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [table, setTable] = useState({
    table_id: null,
    table_name: "",
    capacity: 1,
    reservation_id: null
  });
  const [tableError, setTableError] = useState(null);


  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation 
          table={table}
          setTable={setTable}
          tableError={tableError}
          setTableError={setTableError}
          reservation={reservation}
          setReservation={setReservation}
          resError={resError} 
          setResError={setResError}
          tables={tables}
          setTables={setTables}
          tablesError={tablesError}
          setTablesError={setTablesError}
        />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation 
          reservation={reservation} 
          setReservation={setReservation} 
          resError={resError} 
          setResError={setResError}
        />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable 
          table={table}
          setTable={setTable}
          tableError={tableError}
          setTableError={setTableError}
        />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date={date} 
          setDate={setDate}
          tables={tables}
          setTables={setTables}
          tablesError={tablesError}
          setTablesError={setTablesError}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
