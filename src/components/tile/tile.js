import React from 'react';
import Legends from '../expandedView/legends';
import Ratings from '../expandedView/ratings';
import moment from 'moment';

export default function Tile({ date, post, newDate }) {

    const imageurl = post && post.images[0].imageurl;
    const dateToday = moment(date).format('DD MM YY') === moment().format('DD MM YY') ? "date-today" : "";
    const displayDate = date.getDate();
    const notOfThisMonth = moment(date).format('MMM') !== moment(newDate).format('MMM') ? "other-month" : ""

    return (
        <>

            <div className="calendar-tile">
                <div className="calendar-rating">
                    {post && <Ratings rating={post && post.rating} />}
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