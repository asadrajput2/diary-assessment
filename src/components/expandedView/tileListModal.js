import React, { useRef, useState } from 'react';
import Modal from 'react-responsive-modal';
import ExpandedTilesList from './expandedTileList';
import "react-responsive-modal/styles.css";


export default function CalendarModal({ setOpen, data, open, modal, changeMain, onCloseTile }) {

    const modalContainer = useRef(null);

    return (
        <div
            id="modal-view"
            ref={modalContainer}
        >
            <Modal
                open={open}
                onClose={onCloseTile}
                center
                container={modalContainer.current}
            >
                <ExpandedTilesList
                    data={data}
                    changeMain={(post) => changeMain(post)}
                    modal={modal}
                    onCloseTile={() => onCloseTile()}
                />
            </Modal>
        </div>
    )
}