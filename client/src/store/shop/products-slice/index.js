import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllFilteredProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await axios.get('http://localhost:3000/api/shop/products/get');
        return response.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState: {
        productList: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.error = action.error.message;
            });
    }
});

export default shoppingProductsSlice.reducer;