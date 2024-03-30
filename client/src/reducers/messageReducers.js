// reducers.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  responseMessage: '',
  error: null,
  sectionName: 'General',
  chats: [], 
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessageRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      state.responseMessage = action.payload;
    },
    sendMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSection: (state, action) => {
      state.sectionName = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { sendMessageRequest, sendMessageSuccess, sendMessageFailure, updateSection, setChats } = messageSlice.actions;

export default messageSlice.reducer;
