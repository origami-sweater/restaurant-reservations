import React from "react";

function FormatTable(table){
  const { table_id, table_name, capacity, reservation_id } = table;
  let status = "Occupied";
  if(reservation_id === null) status = "Free";

  return(
  <div key={table_id}>
      <h6>{table_name} - {status}</h6>
      <p>Capacity: {capacity}</p>
  </div>
  );
}

export default FormatTable;