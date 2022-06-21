import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Task from "../models/task";

interface TodosSlice {
    all: Task[],
    filter: ''
}

const initialState: TodosSlice = {
    all: [],
    filter: ''
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        add: (state, { payload }: PayloadAction<string>) => {
            state.all = [
                ...state.all,
                {
                    text: payload,
                    completed: false,
                    id: Math.floor(Math.random()*100)
                }
            ]
        },
        delete: (state,  { payload }: PayloadAction<number>) => {
            state.all = state.all.filter((task: Task) => task.id !== payload);
        },
        complete: (state, { payload }: PayloadAction<number>) => {
            let task = state.all?.find((task: Task) => task.id === payload);
            if (task) task.completed = !task.completed;
        },
        deleteAll: (state) => {
            state.all = []
        },
        completeAll: (state) => {
            state.all.map( (task: Task) => task['completed'] = true)
        }
    },
})

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;