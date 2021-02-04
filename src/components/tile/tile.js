import React, { memo } from 'react';
import Legends from '../expandedView/legends';
import Ratings from '../expandedView/ratings';
import moment from 'moment';

export default function Tile({ date, post, newDate }) {

    const imageurl = post && post.media[0].mediaurl;
    const dateToday = moment(date).format('DD MM YY') === moment().format('DD MM YY') ? "date-today" : "";
    const displayDate = date.getDate();
    const notOfThisMonth = moment(date).format('MMM') !== moment(newDate).format('MMM') ? "other-month" : "";

    let monthName = "";
    if (!notOfThisMonth && date.getDay() === 0) {
        const nextMonth = moment(date).add(6, "day").format("MMMM");
        if (nextMonth !== moment(date).format("MMMM"))
            monthName = nextMonth;
    }

    return (
        <>

            <div className="calendar-tile">
                <div className="calendar-rating">
                    {post && <Ratings rating={post && post.rating} />}
                    <span>
                        {monthName}
                    </span>
                    <span className={`tile-date float-right ${dateToday} ${notOfThisMonth}`}>{displayDate}</span>
                </div>

                {
                    post && <>
                        <img className="tile-photo" src={imageurl} alt="" />

                        <Legends typeofday={post && post.typeofday} />
                    </>
                }
            </div>
        </>
    )
}