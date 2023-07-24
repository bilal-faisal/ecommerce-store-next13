import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    products: Array<any>;
    totalAmount: number;
    totalQuanty: number;
}

let savedProducts: { product_id: string; quantity: number }[] =
    JSON.parse(localStorage.getItem("userCartProducts") || "[]");
let savedQuanty: number = JSON.parse(localStorage.getItem("userCartProducts") || "[]").length

const initialState: CounterState = {
    products: savedProducts || [],
    totalAmount: 0,
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
            let updatedUserCartProducts = state.products.map((prod) => {
                if (prod.product_id == actions.payload.product_id) {
                    prod.quantity = prod.quantity + 1;
                }
                return prod;
            });
            state.products = updatedUserCartProducts;

            // if (actions.payload.quantity < 99) {
            //     ++allUserSelectedProducts[i].quantity;
            //     setAllUserSelectedProducts([
            //       ...allUserSelectedProducts,
            //     ]);
            //     // calculateTotal(allUserSelectedProducts);
            //   }
        }
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer