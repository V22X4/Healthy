import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/messageReducers';

const store = configureStore({
  reducer: {
    message: messageReducer,
    // Add other reducers here
  },
  // Add middleware or other store enhancers if needed
});

export default store;