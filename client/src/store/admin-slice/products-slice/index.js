import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading : false,
    productList : []
}

export const addNewProduct = createAsyncThunk("/products/addnewproduct", 
    async (formData) => {
        const response = await axios.post('http://localhost:3000/api/admin/products/add-product', formData, {
            Headers :{
                'content-Type' : 'application/json'
            }
        });
        return response.data;
    }
);

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", 
    async () => {
        const response = await axios.get('http://localhost:3000/api/admin/products/fetch-products');
        return response.data;
    }
);

export const editProduct = createAsyncThunk("/products/editProduct", 
    async (id, formData) => {
        const response = await axios.put(`http://localhost:3000/api/admin/products/edit-product/${id}`, formData, {
            Headers :{
                'content-Type' : 'application/json'
            }
        });
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk("/products/deleteProduct", 
    async (id) => {
        const response = await axios.delete(`http://localhost:3000/api/admin/products/delete-product/${id}`);
        return response.data;
    }
);

const AdminProductsSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state , action) =>{
            state.isLoading = false;
            state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state , action) =>{
            state.isLoading = false;
            state.productList = [];
        })
    }
})

export default AdminProductsSlice.reducer;