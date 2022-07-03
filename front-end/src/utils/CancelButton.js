import React from "react";
import { useHistory } from "react-router-dom";

//Currently only set up for POST - Create Reservation
function CancelButton() {
    const history = useHistory();

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <button type="cancel" className="btn btn-primary ml-2" onClick={handleCancel}>Cancel</button>
    );
}

export default CancelButton;