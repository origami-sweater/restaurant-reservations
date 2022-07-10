import React from "react";
import { listReservations } from "../utils/api";

function FindButton({ searchFor, setSearchList, setSearchError, setSearchFor }){

    async function findReservations(searchFor){
        const abortController = new AbortController();
        setSearchError(null);
        try{
            const resList = await listReservations(searchFor, abortController.signal);
            setSearchList(resList);
            setSearchFor({mobile_number: ""});
        } catch(error) {
            setSearchError(error);
        };
        return () => abortController.abort();
    };
    
    const onFind = (event) =>{
        event.preventDefault();
        findReservations(searchFor);
    };

    return(
        <>
            <button type="submit" className="btn btn-primary ml-2" onClick={onFind}>Find</button>
        </>
    );
}

export default FindButton;