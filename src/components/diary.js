import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tile from './tile/tile';
import moment from 'moment';
import axios from 'axios';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ExpandedTilesList from './expandedView/expandedTileList';


export default function Diary() {

    const [date, setDate] = useState(new Date());
    const [newDate, setNewDate] = useState(moment().toLocaleString());
    const [scrolPos, setScrollPos] = useState(0);
    const [data, setData] = useState([]);
    const [modal, setModal] = useState({
        main: null,
        left: null,
        right: null,
        moreLeft: null,
        moreRight: null,
    });
    const [open, setOpen] = useState(false);

    const onOpenTile = () => setOpen(true);
    const onCloseTile = () => setOpen(false);


    useEffect(() => {
        axios.post('http://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph',
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
                            "images": {
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
                            "maxitemcount": "50",   //you can ask between 1 to 50 posts (max) at a time.
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

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // window.removeEventListener('wheel', handleWheel);
        }
    });



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
        setScrollPos(window.scrollY);
    }

    function handleWheel(event) {
        if (window.scrollY === 0 && event.deltaY < 0) {
            goBack();
        } else if (event.deltaY > 0 && window.scrollY >= scrolPos) {
            goForward();
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

    return (
        <div
            className="container"
            onWheel={handleWheel}

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
            {/* <button
                onClick={goBack}
            > Back </button> */}
            <Calendar
                value={date}
                // onChange={setDate}
                tileClassName="tile"
                activeStartDate={new Date(newDate)}
                onChange={
                    (date) => {
                        for (let post of data)
                            if (moment(post['calendardatetime']).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
                                addPosts(date);
                                onOpenTile();
                            }
                    }
                }
                tileContent={
                    ({ activeStartDate, date, view }) => {

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
                }
            />
            <Modal open={open} onCloseModal={onCloseTile} center>
                <ExpandedTilesList
                    data={data}
                    changeMain={(post) => changeMain(post)}
                    modal={modal}
                // closeModal={() => closeModal()}
                />
            </Modal>
        </div>
    );
};