// redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for user
const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;  // Store user info (username, email, etc.)
      
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

// Export the actions so that components can dispatch them
export const { login, logout } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
