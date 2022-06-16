import { configureStore } from '@reduxjs/toolkit';
import { coursesSlice } from "./courses-slice";
import { tasksSlice } from "./tasks-slice";

const store = configureStore({
    reducer: {
        courses: coursesSlice.reducer,
        todos: tasksSlice.reducer
    },
});

export default store;