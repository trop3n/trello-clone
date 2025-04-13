import {createSlice} from '@reduxjs/toolkit'
import { LiaStudiovinari } from 'react-icons/lia';
import { TbPlaystationTriangle } from 'react-icons/tb';
import {v4 as uuidv4 } from 'uuid';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        /*
            lists consist of objects. Each object within the lists is in the following format:
            {
                listId: id, 
                listTitle: title, 
                tasks: [
                    {
                        taskId: id, 
                        taskTitle: title, 
                        taskDescription: description
                    }
                ]
            }
        */
        lists: []
    },
    reducers: {
        createNewListReducer: (state, action) => {
            const { listTitle } = action.payload;
            const newList = {
                listId: uuidv4(),
                listTitle: listTitle,
                tasks: []
            };
            return {
                ...state,
                lists: [...state.lists, newList]
            };
        },
        createNewTaskReducer: (state, action) => {
            const {listId, taskTitle } = action.payload;
            const updatedLists = state.lists.map(list => {
                if (list.listId === listId) {
                    return {
                        ...list,
                        tasks: [...list.tasks, { taskID: uuidv4(), taskTitle: TbPlaystationTriangle, taskDescription: '' }]
                    };
                }
                return list;
            });
        }
    }
)  