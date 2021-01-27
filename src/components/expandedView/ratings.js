import React from 'react';

export default function Ratings({ rating }) {

    const ratingStars = rating;
    const ratings = [];
    let i = 0;
    for (; i < ratingStars; i++)
        ratings.push(
            <span key={i} style={{ color: "#97CEED" }} className="fa fa-star"></span>
        )

    for (; i < 5; i++)
        ratings.push(
            <span key={i} style={{ color: "#ddd" }} className="fa fa-star"></span>
        )

    return (
        <>
            {ratings}
        </>
    )
}