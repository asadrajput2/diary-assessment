import React from 'react';
import Legends from './legends';
import Ratings from './ratings';
import moment from 'moment';

export default function ExpandedTile({ tileClass, photoClass, post }) {

    const {
        rating,
        calendardatetime,
        images,
        typeofday,
        text
    } = post;


    const date = calendardatetime && moment(calendardatetime).format("Do MMM, YYYY");
    const imageurl = images && images[0].imageurl;

    return (
        <div
            className="d-flex justify-content-center align-items-center"
        >

            <div className={`card border-radius-0 expand-tile-card ${tileClass}`}>
                <img className={`card-img-top expanded-photo ${photoClass}`} src={imageurl} />
                <div className="card-body">

                    <div className="legends-ratings">
                        <div className="legends"><Legends typeofday={typeofday} /></div>
                        <div className="ratings"><Ratings rating={rating} /></div>
                    </div>

                    <b>{date}</b>
                    <p>{text}</p>

                </div>
            </div>
        </div>
    )
}