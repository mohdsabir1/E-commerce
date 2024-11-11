import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState:{
        items:{},
        loading:false,
        error:null,
        message:'',
        type:''
    },
    reducers:{
        setWishlist:(state,action)=>{
            const {userId, items} =action.payload;
            state.items[userId] = items;
        },

        addWishlist: (state,action)=>{
            const {userId, product} =action.payload
            if(!state.items[userId])
            {
                state.items[userId] = [];
            }
            const existingItems = state.items[userId].find(item=>item.id === product.id)
            if (existingItems) {
                // If the item already exists, set the message
                state.message = 'This item is already in your wishlist!';
                state.type= 'error'
              } else {
                // If the item doesn't exist, add it to the wishlist
                state.items[userId].push(product);
                state.message = 'Item added to your wishlist!';
                 state.type= 'success'
              }
              localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state.items[userId]));
        },
        
        removeFromWishlist:(state,action)=>{
            const{userId,productId}=action.payload;
            if(state.items[userId])
            {
                state.items[userId] = state.items[userId].filter(item=>item.id!= productId)
                localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state.items[userId]));
            }
        }
    }

})

export const { setWishlist, addWishlist,removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
