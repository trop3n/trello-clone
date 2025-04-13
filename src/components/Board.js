import React, { useState } from 'react';
import '../styles/Board.css';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createNewListReducer, dragReducer } from '../boardSlice';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import List from '../components/List';