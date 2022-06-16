import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { tasks: [] },
    reducers: {
        add: (state, action) => {
            let task = action.payload;
            state.tasks.push(task);
        },
        // delete:,
        // completed:,
    },
})

export const tasksActions = tasksSlice.actions;
export default tasksSlice;