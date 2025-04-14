import React, { useState } from 'react';
import '../styles/Board.css';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createNewListReducer, dragReducer } from '../boardSlice';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import List from '../components/List';
import { BiLeftArrow } from 'react-icons/bi';

const Board = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setModalText('');
        setIsModalOpen(false);
    }

    const addList = async () => {
        if (modalText === "") {
            window.alert("Please enter a list name");
            return;
        }
        setModalText('');
        closeModal();
    }

    const modalStyles = {
        content: {
            minWidth: '500px',
            minHeight: '500px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    return (
        <div className="board-container">
            <div className="board">
            </div>
            <div className="board-button">
                <button data-testid='list-add' className="list-add" onClick={() => openModal()}>
                    <AddIcon style={{ fontSize: "2em", color: "black" }}/>
                    <h2 className="list-add-text"> Create a new list </h2>
                </button>
            </div>
            <Modal
                    isOpen={isModalOpen}
                    ariaHideApp={false}
                    onRequestClose={() => closeModal()}
                    style={modalStyles}
                    testId='list-add-modal'
                >
                    <CloseIcon data-testid='list-add-modal-close' style={{ fontSize: "40px", color: "red", position: "absolute", top: 0, right: 0, padding: "10px" }} onClick={() => closeModal()}/>
                    <input
                        type="text"
                        value={modalText}
                        onChange={(event) => setModalText(event.target.value)}
                        placeholder="Enter list name"
                        className="modal-input"
                        data-testid='list-add-input'
                    />
                    <button data-testid='create-list-button' className="modal-button" onClick={() => addList()}> Create list </button>
            </Modal>
        </div>
    );
}

export default Board;