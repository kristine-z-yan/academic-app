import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: [
        {
            type: 'popular',
            imgPath: '/images/img-1.jpg'
        },
        {
            type: 'new',
                imgPath: '/images/img-2.jpg'
        },
        {
            type: 'favorite',
            imgPath: '/images/img-3.jpg'
        },
        {
            type: 'new',
            imgPath: '/images/img-4.jpg'
        },
        {
            type: 'favorite',
            imgPath: '/images/img-5.jpg'
        },
        {
            type: 'popular',
            imgPath: '/images/img-6.jpg'
        },
        {
            type: 'popular',
            imgPath: '/images/img-7.jpg'
        }
    ],
    filtered: []
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        filterByType: (state , action) => {
            if (action.payload === "all") {
                state.filtered = state.all;
            } else {
                state.filtered = state.all.filter(obj =>  obj.type === action.payload)
            }
        },
    },
})

export const coursesActions = coursesSlice.actions

export default coursesSlice;