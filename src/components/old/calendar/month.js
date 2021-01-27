import React, { useState } from 'react';
import moment from 'moment';
import Tile from '../tile/tile';



export default function Month({ month }) {

    const dateObject = month;

    function firstDayOfMonth() {
        // console.log("start of month", moment(dateObject.toLo).startOf("month"));
        const firstDay = dateObject.date(1).format("d");
        return firstDay;

    }

    // put blanks before start day
    const lastMonthDays = [];
    const lastDayOfPrevious = dateObject.subtract(1, 'month').daysInMonth();
    console.log(firstDayOfMonth(), lastDayOfPrevious);
    for (let i = lastDayOfPrevious - firstDayOfMonth() - 1; i <= lastDayOfPrevious; i++) {
        lastMonthDays.push(
            <div className="col month-day blank">
                <Tile date={i} />
            </div>
        );
    }


    const daysInMonth = [];
    for (let i = 1; i <= dateObject.daysInMonth(); i++) {
        daysInMonth.push(
            <div className="col month-day">
                <Tile date={i} />
            </div>
        );
    }

    const nextMonthDays = [];
    const daysLeft = 7 - ((lastMonthDays.length + daysInMonth.length) % 7);
    for (let i = 1; i <= daysLeft; i++) {
        lastMonthDays.push(
            <div className="col month-day blank">
                <Tile date={i} />
            </div>
        );
    }

    const allDays = [...lastMonthDays, ...daysInMonth, ...nextMonthDays];
    let cells = [];
    let rows = [];

    allDays.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if (i === allDays.length - 1) {
            rows.push(cells);
        }
    });


    const allMonthDays = rows.map((d, i) =>
        i !== 0 && <div className="row calendar-row-tile">
            {d}
        </div>
    )


    return (
        <>
            {allMonthDays}
        </>
    )

}