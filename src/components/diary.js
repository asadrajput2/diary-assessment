import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tile from './tile/tile';
import moment from 'moment';
import axios from 'axios';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ExpandedTilesList from './expandedView/expandedTileList';
import { useInView } from 'react-intersection-observer';
import CalendarMonth from './calendarList';
import CalendarModal from './expandedView/tileListModal';


export default function Diary() {

    const [newDate, setNewDate] = useState(moment().toLocaleString());
    const [data, setData] = useState([]);
    const [modal, setModal] = useState({
        main: null,
        left: null,
        right: null,
        moreLeft: null,
        moreRight: null,
    });

    const [open, setOpen] = useState(false);


    useEffect(() => {
        axios.post('https://devapi.quinn.care/graph',
            {
                "requestobjects": [
                    {
                        "posts": {
                            "operationtype": "read",
                            "id": {
                                "return": true
                            },
                            "userid": {
                                "searchvalues": ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                                "return": true
                            },
                            "iscalendarentry": {
                                "searchvalues": ["true"],
                                "return": true
                            },
                            "media": {
                                "return": true
                            },
                            "rating": {
                                "return": true
                            },
                            "text": {
                                "return": true
                            },
                            "privacy": {
                                "searchvalues": [
                                    18
                                ],
                                "return": true
                            },
                            "typeofday": {
                                "return": true
                            },

                            // Don't change anything above ^^	
                            //editable variables start below //

                            "calendardatetime": { // Date Time of a particular post
                                "return": true, // please note: there can be multiple posts on a single day
                                "sort": "descending" // you can sort fetched dates by ascending/descending.
                            },
                            "maxitemcount": "20",   //you can ask between 1 to 50 posts (max) at a time.
                            "continuationtoken": null //replace with the continuation token from response to get the next set
                        }
                    }
                ]
            })
            .then(response => response.data)
            .then(data => setData(data.responseobjects[0].posts));
    }, []);

    useEffect(() => {
        // window.addEventListener('wheel', (event) => handleWheel(event));
        window.addEventListener('scroll', handleScroll, { passive: true });
        // window.scrollTo(0, 457);
        window.scrollTo(0, 457);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // window.removeEventListener('wheel', handleWheel);
        }
    });



    const onOpenTile = () => {
        setOpen(true);
    };

    const onCloseTile = () => {
        document.getElementById("modal-view").style.display = "none";
        document.getElementsByClassName("calendar-head")[0].style.display = "flex";
        document.getElementsByClassName("head-days")[0].style.display = "flex";
        document.getElementById("calendar-month").style.display = "block";
        setOpen(false);
    }

    // const modalContainer = useRef();

    function changeMain(post) {
        setModal({
            main: post,
            left: data.indexOf(post) < data.length - 1 ? data[data.indexOf(post) + 1] : null,
            right: data.indexOf(post) != 0 ? data[data.indexOf(post) - 1] : null,
            moreLeft: data.indexOf(post) < (data.length - 2),
            moreRight: data.indexOf(post) > 1
        });
    }

    function goToToday() {
        setNewDate(moment());
    }

    function goBack() {
        setNewDate(moment(newDate).subtract(1, "month").toLocaleString());
    }

    function goForward() {
        setNewDate(moment(newDate).add(1, "month").toLocaleString());
    }

    function handleScroll() {

        if (window.scrollY + window.innerHeight >= document.body.clientHeight - 4) {
            setNewDate(moment(newDate).add(1, "month").toLocaleString());
            window.scrollTo(0, 457);
            // addNextMonth(date);
        } else if (window.scrollY <= 0) {
            // addPrevMonth(date);
            setNewDate(moment(newDate).subtract(1, "month").toLocaleString());
            window.scrollTo(0, 457);
        }
    }

    function addPosts(date) {
        for (let post of data) {
            if (moment(post['calendardatetime']).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
                setModal({
                    main: post,
                    left: data.indexOf(post) < data.length - 1 ? data[data.indexOf(post) + 1] : null,
                    right: data.indexOf(post) != 0 ? data[data.indexOf(post) - 1] : null,
                    moreLeft: data.indexOf(post) < (data.length - 2),
                    moreRight: data.indexOf(post) > 1
                });
                break;
            }
        }
    }

    function calendarTileOnchange(value, event) {
        for (let post of data) {
            if (moment(post['calendardatetime']).format("YYYY-MM-DD") === moment(value).format("YYYY-MM-DD")) {
                addPosts(value);
                document.getElementById("modal-view").style.display = "block";
                document.getElementsByClassName("calendar-head")[0].style.display = "none";
                document.getElementsByClassName("head-days")[0].style.display = "none";
                document.getElementById("calendar-month").style.display = "none";
                onOpenTile();
            }
        }
    }


    function calendarTileContent({ activeStartDate, date, view }) {

        if (view === "month") {
            let printed = false;
            for (let post of data) {
                if (moment(post['calendardatetime']).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
                    !printed;
                    return <Tile date={date} post={post} newDate={newDate} />;
                }
            }
            if (!printed) {
                return <Tile date={date} post={undefined} newDate={newDate} />;
            }
        }
    }


    return (
        <div
            className="container"
        // id="calendar-month"
        >
            <div className="calendar-head">
                <span className="head-date">
                    <b>{moment(newDate).format('MMMM')}</b> {' '}
                    {moment(newDate).format('YYYY')}
                </span>
                <span className="head-today-btn">
                    <button
                        className="btn"
                        onClick={goToToday}
                    >
                        Today
                    </button>
                </span>
            </div>
            <div className="head-days">

                <div className="">Sun</div>
                <div className="">Mon</div>
                <div className="">Tue</div>
                <div className="">Wed</div>
                <div className="">Thu</div>
                <div className="">Fri</div>
                <div className="">Sat</div>
            </div>

            <div
                id="calendar-month"
            >

                <CalendarMonth
                    newDate={newDate}
                    calendarTileContent={calendarTileContent}
                    calendarTileOnchange={calendarTileOnchange}
                />
            </div>

            <CalendarModal
                modal={modal}
                data={data}
                open={open}
                changeMain={changeMain}
                setOpen={setOpen}
                onCloseTile={onCloseTile}
            />

        </div >
    );
};