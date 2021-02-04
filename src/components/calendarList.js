import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

function CalendarMonth({ newDate, calendarTileContent, calendarTileOnchange }) {

    const [lastSunday, setLastSunday] = useState();

    function getTileClass({ date }) {
        if (date.getDay() === 0)
            return "sunday tile";
        return "tile";
    }

    useEffect(() => {
        if (moment(newDate).format("d") == 0) {
            const nextMonth = moment(newDate).add(6, "day").format("MMMM");
            if (nextMonth !== moment(newDate).format("MMMM")) {
                setLastSunday(newDate);
            }
        }
    }, [lastSunday]);

    function mainCalendarClass({ date }) {
        const thisDay = date.getDay();
        const lastSunday = moment(date).subtract(thisDay, 'day');

        const nextMonth = moment(lastSunday).add(6, "day").format("MMMM");
        if (nextMonth !== moment(lastSunday).format("MMMM")) {
            return getTileClass({ date }) + ' hidden-tile';
        }

        return getTileClass({ date });

    }

    return (
        <>
            <Calendar
                // value={new Date(moment(newDate).subtract(1, 'month'))}
                // onChange={setDate}
                tileClassName={getTileClass}
                activeStartDate={new Date(moment(newDate).subtract(1, 'month').toLocaleString())}
                onChange={calendarTileOnchange}
                tileContent={calendarTileContent}
                calendarType="US"
            // onScroll={() => handleScrollTop}
            />
            <Calendar
                // value={new Date(newDate)}
                // onChange={setDate}
                tileClassName={mainCalendarClass}
                activeStartDate={new Date(newDate)}
                onChange={calendarTileOnchange}
                tileContent={calendarTileContent}
                calendarType="US"
            />
            <Calendar
                // value={new Date(moment(newDate).add(1, 'month'))}
                // onChange={setDate}
                tileClassName={getTileClass}
                activeStartDate={new Date(moment(newDate).add(1, 'month').toLocaleString())}
                onChange={calendarTileOnchange}
                tileContent={calendarTileContent}
                calendarType="US"

            // onScroll={() => handleScrollEnd}
            />
        </>
    )
}

export default CalendarMonth;