import React from 'react';
import ExpandedTile from './expandedTile';

export default function ExpandedTilesList({ modal, changeMain, onCloseTile }) {

    const {
        main,
        left,
        right,
        moreLeft,
        moreRight
    } = modal;

    return (
        <div className="container">
            <button
                className="btn btn-secondary float-right rounded-circle"
                data-testid="close-button"
                style={{ marginTop: "10px" }}
                onClick={onCloseTile}
            >
                &times;
            </button>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
            >
                {
                    moreLeft &&
                    <a
                        onClick={() => changeMain(left)}
                    >
                        <i style={{ fontSize: 'xx-large', color: "#ccc", cursor: "pointer" }} className="fa fa-arrow-circle-left"></i>
                    </a>
                }

                {
                    left && <ExpandedTile
                        tileClass="side-tile"
                        photoClass="side-tile-photo"
                        post={left}
                    />
                }

                {
                    main &&
                    <ExpandedTile
                        photoClass=""
                        post={main}
                    />
                }

                {
                    right &&
                    <ExpandedTile
                        tileClass="side-tile"
                        photoClass="side-tile-photo"
                        post={right}
                    />
                }

                {
                    moreRight &&
                    <a
                        onClick={() => changeMain(right)}
                    >
                        <i style={{ fontSize: 'xx-large', color: "#ccc", cursor: "pointer" }} className="fa fa-arrow-circle-right"></i>
                    </a>
                }
            </div>
        </div>

    )
}