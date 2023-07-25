import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    products: Array<any>;
    totalQuanty: number;
}

let savedProducts: { product_id: string; quantity: number }[] = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("userCartProducts") || "[]") : [];
let savedQuanty: number = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("userCartProducts") || "[]").length : 0;

const initialState: CounterState = {
    products: savedProducts || [],
    totalQuanty: savedQuanty || 0,
};

export const cartSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state, actions: PayloadAction<any>) => {
            let productFound = false;
            let updatedUserCartProducts = state.products.map((prod) => {
                if (prod.product_id == actions.payload.product_id) {
                    productFound = true;
                    return {
                        product_id: prod.product_id,
                        quantity: prod.quantity + actions.payload.count,
                    };
                }
                return { product_id: prod.product_id, quantity: prod.quantity };
            });

            if (!productFound) {
                updatedUserCartProducts.push({ product_id: actions.payload.product_id, quantity: actions.payload.count });
                state.totalQuanty = updatedUserCartProducts.length;
            }
            state.products = updatedUserCartProducts;
        },

        removeFromCart: (state, actions: PayloadAction<any>) => {
            let updatedUserCartProducts =
                state.products.filter(
                    (prod) => prod.product_id != actions.payload.product_id
                );
            state.totalQuanty = updatedUserCartProducts.length;
            state.products = updatedUserCartProducts;
        },
        
        increaseProductQuantity: (state, actions: PayloadAction<any>) => {
            let foundProduct = state.products.find((item) => item.product_id === actions.payload.product_id);
            if (foundProduct) {
                foundProduct.quantity += 1;
                state.products = [...state.products, foundProduct];
            }
        },
        decreaseProductQuantity: (state, actions: PayloadAction<any>) => {
            let foundProduct = state.products.find((item) => item.product_id === actions.payload.product_id);
            if (foundProduct) {
                foundProduct.quantity -= 1;
                state.products = [...state.products, foundProduct];
            }
        },
        changeWholeState: (state, actions: PayloadAction<any>) => {
            state = {
                products: actions.payload.products,
                totalQuanty: actions.payload.quantity,
            };
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer