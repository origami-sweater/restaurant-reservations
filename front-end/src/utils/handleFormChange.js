/**
 * Updates the current state of reservation in React
 * @param {target}
 * the form field being altered
 * @param {reservation}
 * the current reservation state
 * @param {setReservations}
 * function that alters state of reservation
 */
function handleFormChange({target, reservation, setReservation}){
    const { name, value } = target;
    switch(name){
        case "reservation_date":
            setReservation({...reservation, [name]: value});
            break;
        case "reservation_time":
            setReservation({...reservation, [name]: value});
            break;
        default:
            setReservation({...reservation, [name]: value});
            break;
    };
}

export default handleFormChange;