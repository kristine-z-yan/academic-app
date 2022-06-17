import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { all: [], filter: '' },
    reducers: {
        add: (state, action) => {
            state.all.push(action.payload);
        },
        delete: (state, action) => {
            state.all = state.all.filter((task) => task.id !== action.payload);
        },
        complete: (state, action) => {
            let task = state.all.find((task) => task.id === action.payload);
            task['completed'] = !task['completed'];
        },
        deleteAll: (state) => {
            state.all = []
        },
        completeAll: (state) => {
            state.all.map( task => task['completed'] = true)
        }
    },
})

export const tasksActions = tasksSlice.actions;
export default tasksSlice;