import {configureStore} from '@reduxjs/toolkit';
import { coursesSlice } from "./courses-slice";
import { tasksSlice } from "./tasks-slice";
import { UsersSlice } from "./users-slice";

function saveToLocalStorage(state: RootState) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("state", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("state");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = configureStore({
     reducer: {
        courses: coursesSlice.reducer,
        todos: tasksSlice.reducer,
        users: UsersSlice.reducer,
    },
    preloadedState: loadFromLocalStorage()
});

export type RootState = ReturnType<typeof store.getState>

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;