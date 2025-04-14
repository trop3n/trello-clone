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
    }
}