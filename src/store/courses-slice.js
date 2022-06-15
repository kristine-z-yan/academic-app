import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // type, img-url
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        filterByType: (state, action) => {
            // filter by action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { filterByType } = coursesSlice.actions

export default coursesSlice.reducer