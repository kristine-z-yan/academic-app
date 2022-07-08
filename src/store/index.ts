import {configureStore} from '@reduxjs/toolkit';
import { coursesSlice } from "./courses-slice";
import { tasksSlice } from "./tasks-slice";
import { UsersSlice } from "./users-slice";
import logger from 'redux-logger'

const store = configureStore({
     reducer: {
        courses: coursesSlice.reducer,
        todos: tasksSlice.reducer,
        users: UsersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>

export default store;