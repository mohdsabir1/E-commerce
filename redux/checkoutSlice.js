const { createSlice } = require("@reduxjs/toolkit");
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
      items: {},
      error: null,
      type: '',
      message: '',
    },
    reducers: {
      setCheckutItems: (state, action) => {
        const { userId, items } = action.payload;
        state.items[userId] = items || [];
      },
      addCheckout: (state, action) => {
        const { userId, items, profileData, totalPrice } = action.payload;
  
        // Initialize array if it doesn't exist
        if (!state.items[userId]) {
          state.items[userId] = [];
        }
  
        // Create new order
        const newOrder = {
          id: Date.now().toString(),
          cartItems: items,
          profileData,
          totalPrice,
          date: new Date().toISOString(),
          status: 'pending'
        };
  
        // Add new order to the beginning of the array
        state.items[userId] = [newOrder, ...state.items[userId]];
  
        // Update state
        state.message = 'Order placed successfully!';
        state.type = 'success';
  
        // Save to localStorage
        try {
          localStorage.setItem(`checkout_${userId}`, JSON.stringify(state.items[userId]));
        } catch (error) {
          console.error('Error saving checkout:', error);
        }
      },
      clearCheckoutHistory: (state, action) => {
        const { userId } = action.payload;
        state.items[userId] = [];
        localStorage.removeItem(`checkout_${userId}`);
      }
    }
  });
  
  export const { setCheckutItems, addCheckout, clearCheckoutHistory } = checkoutSlice.actions;
  export default checkoutSlice.reducer;