import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import {
    updateCartItemCountLocalStorageVariable,
    updateUserCartProductsLocalStorageVariable,
} from "@/components/CartUtils";


export const store = configureStore({
    reducer: {
        cartSlice
    },
})

store.subscribe(() => {
    const state = store.getState();
    updateUserCartProductsLocalStorageVariable(state.cartSlice.products);
    updateCartItemCountLocalStorageVariable(state.cartSlice.totalQuanty);
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch