import React, { useState } from "react";
import FindButton from "./FindButton";
import ErrorAlert from "../layout/ErrorAlert";
import FormatReservation from "../reservations/FormatReservation";

function Search(){
    const [searchList, setSearchList] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [searchFor, setSearchFor] = useState({mobile_number: ""});
    const noReservationsMessage = "No reservations found."

    const matchingReservations = searchList.map((reservation) => {
        if(reservation){
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
        } else {
            return null;
        };
    });

    return(
        <>
            <h2 className="ml-1">Search</h2>
            {searchError !== "No reservations found." && <ErrorAlert error={searchError}/>}
            <label htmlFor="search_mobile_number" className="input-group flex-nowrap mt-2">
                <input 
                    name="mobile_number"
                    type="text" 
                    className="form-control"
                    aria-label="mobile_number" 
                    aria-describedby="find_button"
                    placeholder="Enter a customer's phone number"
                    onChange={({target}) => setSearchFor({mobile_number: target.value})}
                />
                <FindButton searchFor={searchFor} setSearchFor={setSearchFor} setSearchList={setSearchList} setSearchError={setSearchError}/>
            </label>
            {searchList.length > 0 && matchingReservations}
            {searchList.length === 0 && <p className="ml-1">{noReservationsMessage}</p>}
        </>
    );
}

export default Search;