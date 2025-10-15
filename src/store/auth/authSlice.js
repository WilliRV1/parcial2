import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', 
        uid: null,
        email: null,
        displayName: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
        },
        logout: (state) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;

