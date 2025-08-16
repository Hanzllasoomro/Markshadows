import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    addressList: []
};

const addNewAddress = createAsyncThunk('/addresses/addNewAddress', async (formData) => {
    const response = await axios.post(`http://localhost:3000/api/shop/address/add`, formData);
    return response.data;
});

const fetchAllAddress = createAsyncThunk('/addresses/fetchAllAddress', async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/shop/address/get/${userId}`);
    return response.data;
});

const editAddress = createAsyncThunk('/addresses/editAddress', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`http://localhost:3000/api/shop/address/update/${userId}/${addressId}`, formData);
    return response.data;
});

const deleteAddress = createAsyncThunk('/addresses/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`);
    return response.data;
});

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(addNewAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.addressList = [];
            })
            .addCase(fetchAllAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAllAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.addressList = [];
            })
            .addCase(editAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedAddress = action.payload;
                state.addressList = state.addressList.map((addr) =>
                    addr._id === updatedAddress._id ? updatedAddress : addr
                );
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const { addressId } = action.payload;
                state.addressList = state.addressList.filter(
                    (addr) => addr._id !== addressId
                );
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;