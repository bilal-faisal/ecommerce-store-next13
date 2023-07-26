import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetch', async (userId) => {
    const response = await fetch(`/api/cart?user_id=${userId}`);
    const data = await response.json();
    const newArray = data.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));
    return newArray;
});

export interface CounterState {
    products: Array<any>;
    totalQuanty: number;
}

const initialState: CounterState = {
    products: [],
    totalQuanty: 0,
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
            }
        },
        decreaseProductQuantity: (state, actions: PayloadAction<any>) => {
            let foundProduct = state.products.find((item) => item.product_id === actions.payload.product_id);
            if (foundProduct) {
                foundProduct.quantity -= 1;
            }
        },

        changeWholeState: (state, actions: PayloadAction<any>) => {
            state.products = actions.payload.products;
            state.totalQuanty = actions.payload.quantity;
        },
        reset: () => initialState,

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.totalQuanty = action.payload.length;
        });
    }

})

export const cartActions = cartSlice.actions

export default cartSlice.reducer