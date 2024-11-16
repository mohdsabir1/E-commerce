const { createSlice } = require("@reduxjs/toolkit");

const checkoutSlice = createSlice({
    name:'checkout',
    initialState:{
        items:{},    
        error:null,
        type:'',
        message:'',

    },
    reducers:{
        setCheckoutItems: (state, action) => {
            const { userId, items } = action.payload;
            state.items[userId] = items;
         }
         ,
        addCheckout: (state, action) => {
            const { userId, items } = action.payload;
            
            if (!state.items[userId]) {
               state.items[userId] = [];
            }
            state.items[userId].push(items); // You should push 'items', not 'products'
            state.message = 'Your order has been placed successfully!';
            state.type = 'success';
         
            // Save the updated cart in localStorage
            localStorage.setItem(`checklist_${userId}`, JSON.stringify(state.items[userId]));
         }
         
    }
})


export const {setCheckutItems, addCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer;