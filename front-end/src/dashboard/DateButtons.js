import React from "react";
import { useHistory } from "react-router";
import { previous, next, today } from "../utils/date-time";

function DateButtons({ date, setDate }){
    const history = useHistory();

    const onPrevious = (event) => {
        history.push(`/dashboard?date=${previous(date)}`);
    };

    const onToday = (event) => {
        history.push(`/dashboard?date=${today()}`);
    };

    const onNext = (event) => {
        history.push(`/dashboard?date=${next(date)}`);
    };

    return(
        <>
            <button type="previous_day" className="btn btn-primary btn-sm" onClick={onPrevious}>Previous Day</button>
            <button type="today" className="btn btn-primary btn-sm ml-2" onClick={onToday}>Today</button>
            <button type="next_day" className="btn btn-primary btn-sm ml-2" onClick={onNext}>Next Day</button>
        </>
    )
}

export default DateButtons;