import {ActionCreatorWithPayload, AnyAction, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import { UserProps } from "../models/user";

interface UsersSlice {
    loading: boolean,
    hasErrors: boolean,
    isSucceed: boolean,
    user: UserProps | {},
    all: UserProps[];
}

export const initialState: UsersSlice = {
    loading: false,
    hasErrors: false,
    isSucceed: false,
    user: {},
    all: [],
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: state => {
            state.loading = true
        },
        getUsersSuccess: (state, { payload }) => {
            state.all = payload
            state.loading = false
            state.hasErrors = false
        },
        getUsersFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addUser: (state)  => {
            state.isSucceed = true;
        },
        userDeleted: (state)  => {
            state.loading = false;
        },
        getSingleUser: (state, { payload })  => {
            state.user = payload;
        },
        userEdited: (state, { payload })  => {
            state.all[payload.name] = payload
            state.loading = false;
            state.user = {}
        },
    }
})

export const userActions = UsersSlice.actions

export function fetchUsers() {
    return  async (dispatch: ActionCreatorWithPayload<any>) => {
        dispatch(userActions.getUsers())
        try {
            const response = await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users.json')
            const data = await response.json();
            dispatch(userActions.getUsersSuccess(data))
        } catch (error) {
            dispatch(userActions.getUsersFailure())
        }
    }
}

export function addNewUser (user: UserProps) {
    return async (dispatch: ActionCreatorWithPayload<any>) => {
        await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        dispatch(userActions.addUser())
    }
}

export function deleteUser (key: string) {
    return async (dispatch: ActionCreatorWithPayload<any>) => {
        await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users/'+key+'.json', {
            method: 'DELETE',
        }).then((res) => {
            dispatch(userActions.userDeleted())
            dispatch(fetchUsers())
        })
    }
}

export function getSingleUser (key: string) {
    return async (dispatch: ActionCreatorWithPayload<any>) => {
        await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users/'+key+'.json', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    const data = {...res, 'name': key }
                    dispatch(userActions.getSingleUser(data))
                }
        })
    }
}

export function editUser (user: UserProps) {
    return async (dispatch: ActionCreatorWithPayload<any>) => {
        await fetch('https://academic-cc5a9-default-rtdb.firebaseio.com/users/'+user.name+'.json', {
            method: 'PATCH',
            body: JSON.stringify(user)
        }).then((res) => res.json())
            .then((res) => {
                dispatch(userActions.userEdited(res))
            })
    }
}