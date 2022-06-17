import {configureStore} from '@reduxjs/toolkit';
import { coursesSlice } from "./courses-slice";
import { tasksSlice } from "./tasks-slice";

function saveToLocalStorage(state) {
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
        todos: tasksSlice.reducer
    },
    preloadedState: loadFromLocalStorage()
});


store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;