/**
 * Updates the current state of reservation or table in React. Tables only have two fields, so 
 * it made most sense to set reservation form field changes as the default.
 * @param {target}
 * the form field being altered
 * @param {reservation}
 * the current reservation state
 * @param {setReservations}
 * function that alters state of reservation
 * @param {table}
 * the current table state
 * @param {setTable}
 * function that alters state of table
 */

function handleFormChange({target, reservation, setReservation, table, setTable}){
    const { name, value } = target;
    switch(name){
        case "table_name":
            setTable({...table, [name]: value});
            break;
        case "capacity":
            setTable({...table, [name]: value});
            break;
        default:
            setReservation({...reservation, [name]: value});
            break;
    };
}

export default handleFormChange;