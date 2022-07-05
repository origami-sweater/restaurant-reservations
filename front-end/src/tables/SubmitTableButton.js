import React from "react";
import { useHistory } from "react-router";
import { postTable } from "../utils/api";

function SubmitTableButton({ table, setTable, setTableError, reservation }){
    const history = useHistory();

    //New Table - handles API POST
    async function createTable(newTable){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            await postTable(newTable, signal);
            //sends us to dashboard
            history.push(`/dashboard`)
            history.go(0); 
        } catch(err) {
            console.log(err.name);
            setTableError(err);
        };
    };

    /*//Update table - handles API PUT
    async function updateTable(resTable){
        const abortController = new AbortController();
        try {
            const signal = abortController.signal;
            //await postTable(resTable, signal);
            //sends us to dashboard
            history.push(`/dashboard`)
            history.go(0); 
        } catch(err) {
            console.log(err.name);
            setTableError(err);
        };
    };*/

    //POST ONLY CURRENTLY 
    const handleSubmit = (event) => {
        event.preventDefault();
        //Reset error state
        setTableError(null);

        //POST - Create Table behavior
        const newTable = {
            table_name: table.table_name,
            capacity: Number(table.capacity) 
        };
        //API call
        createTable(newTable);
        //Resets form state
        setTable({
            table_name: "",
            capacity: 1
        });
    };

    return (
        <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
    );
}

export default SubmitTableButton;