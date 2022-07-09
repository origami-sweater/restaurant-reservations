import React, { useState } from "react";
import { listReservations } from "../utils/api";

function FindButton({ searchFor, searchList, setSearchList, setSearchError, setSearchFor }){

    function findReservations(searchFor){
        const abortController = new AbortController();
        setSearchError(null);
        listReservations(searchFor, abortController.signal)
            .then(setSearchList)
            .catch(setSearchError);
        return () => abortController.abort();
    };
    
    const onFind = (event) =>{
        event.preventDefault();
        findReservations(searchFor);
        setSearchFor({mobile_number: ""})
    }

    return(
        <>
            <button type="submit" className="btn btn-primary ml-2" onClick={onFind}>Find</button>
        </>
    )
}

export default FindButton;