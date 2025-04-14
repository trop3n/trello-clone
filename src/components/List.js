import React, { useState } from 'react';
import '../styles/List.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { createNewTaskReducer, deleteListReducer, editListTitleReducer } from '../boardSlice';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import Task from '../components/Task';

const List = ({ list }) => {

    const dispatch = useDispatch();

    const [taskValue, setTaskValue] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setModalText('');
        setIsModalOpen(false);
    }

    const editListTitle = async () => {
        if (modalText === "") {
            window.alert("Please enter updated list name");
            return;
        }
        dispatch(editListTitleReducer({listId: list.listId, updatedListTitle: modalText}));
        setModalText('');
        closeModal();
    }

    return (
        <div>
            
        </div>
    );
};

export default List;