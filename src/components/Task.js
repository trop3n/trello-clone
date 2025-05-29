import React, { useState } from 'react';
import '../styles/Task.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { deleteTaskReducer, editTaskReducer } from '../boardSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

const Task = ({ list, task }) => {

    const dispatch = useDispatch();

    const [modalTaskValue, setModalTaskValue] = useState(task.taskTitle);
    const [modalDescriptionValue, setModalDescriptionValue] = useState(task.taskDescription);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setModalTaskValue(task.taskTitle);
        setModalDescriptionValue(task.taskDescription);
        setIsModalOpen(true)
    };
    const closeModal = () => {
        setModalTaskValue(task.taskValue);
        setModalDescriptionValue(task.taskDescription);
        setIsModalOpen(false);
    }

    const editTask = async () => {
        if (modalTaskValue === "") {
            window.alert("Task title cannot be empty! Please write title for the task.");
            return;
        }
        dispatch(editTaskReducer(
            {
                listId: list.listId,
                taskId: task.taskID,
            }
        ))
    }

export default Task;