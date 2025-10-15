import { createSlice } from '@reduxjs/toolkit';

export const socialSlice = createSlice({
    name: 'social',
    initialState: {
        isSaving: false,
        messages: [], // Lista
        notifications: [], // Pila
        directMessagesQueue: [], //Cola
    },
    reducers: {
        setSocialData: (state, action) => {
            state.messages = action.payload.messages || [];
            state.notifications = action.payload.notifications || [];
            state.directMessagesQueue = action.payload.directMessagesQueue || [];
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload); 
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload); 
        },
        addDirectMessage: (state, action) => {
            state.directMessagesQueue.push(action.payload); 
        },
        sendNextDirectMessage: (state) => {
            state.directMessagesQueue.shift(); 
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload;
        }
    }
});

export const {
    setSocialData,
    addMessage,
    addNotification,
    addDirectMessage,
    sendNextDirectMessage,
    setSaving
} = socialSlice.actions;

