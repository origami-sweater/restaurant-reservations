import React from "react";
import FinishButton from "./FinishButton";

function FormatTable({ table, setTables, tableError, setTableError, setTablesError }){
  const { table_id, table_name, capacity, reservation_id } = table;
  let status = "Occupied";
  if(reservation_id === null) status = "Free";

  return(
  <div key={table_id}>
      <h6>{table_name}</h6>
      <p data-table-id-status={table_id}>{status}</p>
      <p>Capacity: {capacity}</p>
      {status === "Occupied" && 
        <FinishButton 
            table={table} 
            setTables={setTables} 
            tableError={tableError}
            setTableError={setTableError} 
            setTablesError={setTablesError}
        />}
  </div>
  );
}

export default FormatTable;