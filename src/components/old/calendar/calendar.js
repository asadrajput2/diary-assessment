import React, { useState, useEffect } from 'react';
import DayHeader from './dayHeader';
import Month from './month';
import moment from 'moment';


export default function Calendar() {

    const [dateObject, setDateObject] = useState(moment().toLocaleString());
    const [month, setMonth] = useState(moment(dateObject).format("MMMM"));
    const [year, setYear] = useState(moment(dateObject).format("YY"));

    useEffect(() => {

        console.log(month);
        console.log(year);

        setMonth(moment(dateObject).format("MMMM"));
        setYear(moment(dateObject).format("YY"));
    }, [dateObject]);

    console.log('dateObject', dateObject);
    console.log('year', year);
    console.log('month', month);

    function goBack(e) {

        setDateObject(moment(dateObject).subtract(1, 'month'));

        console.log(dateObject);
    }

    function goForward(e) {

        setDateObject(moment(dateObject).add(1, 'month'));
        console.log(dateObject);
    }

    return (
        <div className="calendar">
            <div>
                <span className="month-title"><b>{month}</b> {year}</span>
                <span className="float-right">
                    <button className="btn btn-primary btn-sm"
                        onClick={goBack}
                    >
                        Back
                    </button>

                    <button className="btn btn-primary btn-sm"
                        onClick={goForward}
                    >
                        Next
                    </button>
                </span>
            </div>
            <DayHeader />
            <Month month={moment(dateObject)} />
        </div>
    );
};