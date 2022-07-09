import React from "react";
import FinishButton from "./FinishButton";

function FormatTable({ table, setTables, tableError, setTableError, setTablesError }){
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
            tableError={tableError}
            setTableError={setTableError} 
            setTablesError={setTablesError}
        />}
  </tr>
  );
}

export default FormatTable;