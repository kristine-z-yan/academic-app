import {ActionCreatorWithPayload, AnyAction, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {UserProps} from "../models/user";

interface UsersSlice {
    loading: boolean,
    hasErrors: boolean,
    isSucceed: boolean,
    users: UserProps[],
}

export const initialState: UsersSlice = {
    loading: false,
    hasErrors: false,
    isSucceed: false,
    users: [],
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: state => {
            state.loading = true
        },
        getUsersSuccess: (state, { payload }) => {
            state.users = payload
            state.loading = false
            state.hasErrors = false
        },
        getUsersFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addUser: (state,  { payload })  => {
            state.isSucceed = true;
        }
    }
})

export function fetchUsers() {
    return  async (dispatch: ActionCreatorWithPayload<any>) => {
        dispatch(UsersSlice.actions.getUsers())

        try {
            const response = await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users.json')
            const data = await response.json()
            console.log(data);
            dispatch(UsersSlice.actions.getUsersSuccess(data))
        } catch (error) {
            dispatch(UsersSlice.actions.getUsersFailure())
        }
    }
}

export function addNewUser (user: UserProps) {
    return async (dispatch: ActionCreatorWithPayload<any>) => {
        await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        dispatch(UsersSlice.actions.addUser(user))
    }
}

