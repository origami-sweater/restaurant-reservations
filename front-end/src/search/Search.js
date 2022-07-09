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
            {searchError !== "No reservations found." && <ErrorAlert error={searchError}/>}
            <h4>Search</h4>
            <label htmlFor="search_mobile_number">
                <input 
                    name="mobile_number"
                    type="text" 
                    placeholder="Enter a customer's phone number"
                    onChange={({target}) => setSearchFor({mobile_number: target.value})}
                />
                <FindButton searchFor={searchFor} searchList={searchList} setSearchFor={setSearchFor} setSearchList={setSearchList} setSearchError={setSearchError}/>
            </label>
            {searchList.length > 0 && matchingReservations}
            {searchList.length === 0 && <p>{noReservationsMessage}</p>}
        </>
    )
}

export default Search;