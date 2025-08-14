import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllFilteredProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async ({ filterParams, sortParams }) => {
        const queryObj = {};

        for (const [key, value] of Object.entries(filterParams || {})) {
            if (Array.isArray(value)) {
                queryObj[key] = value.join(',');
            } else {
                queryObj[key] = value;
            }
        }

        queryObj.sortBy = sortParams || 'priceAsc';

        const queryString = new URLSearchParams(queryObj).toString();

        const response = await axios.get(
            `http://localhost:3000/api/shop/products/get?${queryString}`
        );

        return response.data;
    }
);

export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async ( id ) => {

        const response = await axios.get(
            `http://localhost:3000/api/shop/products/get/${id}`
        );

        return response.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState: {
        productList: [],
        isLoading: false,
        error: null,
        productDetails: null,
    },
    reducers: {
        setProductDetails : (state) =>{
            state.productDetails = null
        }
    },
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
            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null;
                state.error = action.error.message;
            });
    }
});
export const { setProductDetails } = shoppingProductsSlice.actions;
export default shoppingProductsSlice.reducer;