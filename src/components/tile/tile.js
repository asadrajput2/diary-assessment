import React from 'react';
import Legends from '../expandedView/legends';
import Ratings from '../expandedView/ratings';

export default function Tile({ date, post }) {

    const imageurl = post && post.images[0].imageurl;

    return (
        <>

            <div className="calendar-tile">
                <div className="calendar-rating">
                    {post && <Ratings rating={post && post.rating} />}
                    <span className="tile-date float-right">{date}</span>
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