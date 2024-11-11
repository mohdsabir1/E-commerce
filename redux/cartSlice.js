import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},  // Organized by userId
    loading: false,
    error: null,
    message:''
  },
  reducers: {
    setUserCart: (state, action) => {
      const { userId, items } = action.payload;
      state.items[userId] = items;
    },
    addToCart: (state, action) => {
      const { userId, product, quantity = 1 } = action.payload;
      if (!state.items[userId]) {
        state.items[userId] = [];
      }
      
      const existingItem = state.items[userId].find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
        state.message = 'The item Added in Cart!';
                state.type= 'success'
      } else {
        state.items[userId].push({ ...product, quantity });
        state.message = 'This item Added in Cart!';
                state.type= 'success'
      }
      
      // Save to localStorage
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items[userId]));
    },
    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      if (state.items[userId]) {
        state.items[userId] = state.items[userId].filter(item => item.id !== productId);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items[userId]));
        state.message = 'This item Removed from Cart!';
                state.type= 'success'
      }
    },
    updateQuantity: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      if (state.items[userId]) {
        const item = state.items[userId].find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
          localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items[userId]));
          state.message = 'Quantity update!';
                state.type= 'success'
        }
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      state.items[userId] = [];
      localStorage.removeItem(`cart_${userId}`);
    }
  }
});

export const { setUserCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
