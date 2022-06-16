import { configureStore } from '@reduxjs/toolkit';
import {coursesSlice} from "./courses-slice";

const store = configureStore({
    reducer: { courses: coursesSlice.reducer },
});

export default store;