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
            return {
                ...state,
                lists: updatedLists
            };
        },
        deleteListReducer: (state, action) => {
            const { listID } = action.payload;
            const updatedLists = state.lists.filter(list => list.listId !== listId);
            return {
                ...state,
                lists: updatedLists
            };
        },
        editListTitleReducer: (state, action) => {
            const { listId, updatedListTitle } = action.payload;
            const updatedLists = state.lists.map(list =>
                list.listId === listId
                    ? { ...list, listTitle: updatedListTitle }
                    : list 
            );
            return {
                ...state,
                lists:updatedLists
            };
        },
        editTaskReducer: (state, action) => {
            const { listId, taskId, updatedTaskTitle, updatedTaskDescription } = action.payload;
            const updatedLists = state.lists.map(list =>
                list.listId === listId
                    ? {
                        ...list,
                        tasks: list.tasks.map(task =>
                            task.taskId === taskId
                                ? { ...task, taskTitle: updatedTaskTitle, taskDescription: updatedTaskDescription }
                                : task
                        )
                    }
                : list
            );
            return {
                ...state,
                lists: updatedLists
            };
        },
        dragReducer: (state, action) => {
            const { results } = action.payload;
            const { source , destination, type } = results;
            if (!destination) {
                return;
            }
            // dragging lists around
            if (type === "listDrag") {
                // If tasks are being dragged in board droppable, then we return
                if (source.droppableId !== "boardDroppable" || destination.droppableId !== "boardDroppable") {
                    return;
                }
                // list dragged and dropped at the same position
                if (source.index === destination.index) {
                    return;
                }
                const stateCopy = state.lists.map(list => ({
                    ...list,
                    tasks: [...list.tasks.map(task => ({ ...task }))]
                }));
                const [removedList] = stateCopy.splice(source.index, 1);
                stateCopy.splice(destination.index, 0, removedList);
                return {
                    ...state,
                    lists: stateCopy
                };
            }
            else {
                // task dragged and dropped at the same position
                if ((source.droppableId === destination.droppableId) && (source.index === destination.index)) {
                    return;
                }
                const stateCopy = state.lists.map(list => ({
                    ...lists,
                    tasks: [...list.tasks.map(task => ({ ...task }))]
                }));
                // if dragged within the same list
                if (source.droppableId === destination.droppableId) {
                    const listIndex = stateCopy.findIndex(list => list.listId === source.droppableId);
                    const listCopy = stateCopy[listIndex];
                    const tasksCopy = listCopy.tasks;
                    const [removedTasksCopy] = tasksCopy.splice(source.index, 1);
                    tasksCopy.splice(destination.index, 0, removedTasksCopy);
                    listCopy.tasks = tasksCopy;
                    stateCopy[listIndex] = listCopy;
                    return {
                        ...state,
                        lists: stateCopy
                    };
                }
            }
        }
    }
)  