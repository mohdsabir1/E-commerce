import { createSlice } from "@reduxjs/toolkit";



const profileSlice = createSlice({
  name: 'profile',
  
  initialState: {
   
    items: {},
    loading: false,
    error: null,
    message: '',
    type: '',
     },
  reducers: {
    setProfile:(state,action)=>{
      const {userId, items} =action.payload;
      state.items[userId] = items;
  },

    addProfile: (state, action) => {
      const { userId, profileData } = action.payload;

      // If userId doesn't exist in items, initialize it as an empty array
      if (!state.items[userId]) {
        state.items[userId] = [];
      }

      const existingItem = state.items[userId].find(item => item.id === profileData.id);

      if (existingItem) {
        // Set error message if the item already exists
        state.message = 'This item is already in your wishlist!';
        state.type = 'error';
      } else {
        // Add the new item to the wishlist
        state.items[userId].push(profileData);
        state.message = 'Profile Added!';
        state.type = 'success';
      }

      localStorage.setItem(`profile_${userId}`, JSON.stringify(state.items[userId]));
    },

    editProfile: (state, action) => {
      const { userId, profileId, updatedProfile } = action.payload;
    
      // Ensure user exists
      if (state.items[userId]) {
        const profileIndex = state.items[userId].findIndex(profile => profile.id === profileId);
        if (profileIndex !== -1) {
          // Update the profile
          state.items[userId][profileIndex] = { ...state.items[userId][profileIndex], ...updatedProfile };
          state.message = 'Profile updated successfully!';
          state.type = 'success';
    
          // Persist updated data in localStorage
          localStorage.setItem(`profile_${userId}`, JSON.stringify(state.items[userId]));
        } else {
          state.message = 'Profile not found!';
          state.type = 'error';
        }
      } else {
        state.message = 'User not found!';
        state.type = 'error';
      }
    }
    
  },
});

export const { setProfile, addProfile,editProfile } = profileSlice.actions;
export default profileSlice.reducer;
