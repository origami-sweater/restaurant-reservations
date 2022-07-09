import React from "react";
import FinishButton from "./FinishButton";

function FormatTable({ table, setTables, setReservationsError, tableError, reservationsError, setTableError, setTablesError }){
  const { table_id, table_name, capacity, reservation_id } = table;
  let status = "Occupied";
  if(reservation_id === null) status = "Free";

  return(
  <tr>
      <td>{table_name}</td>
      <td data-table-id-status={table_id}>{status}</td>
      <td>{capacity}</td>
      {status === "Occupied" && 
        <FinishButton 
            table={table} 
            setTables={setTables} 
            setReservationsError={setReservationsError}
            setTableError={setTableError} 
            setTablesError={setTablesError}
            tableError={tableError}
            reservationsError={reservationsError}
        />}
  </tr>
  );
}

export default FormatTable;