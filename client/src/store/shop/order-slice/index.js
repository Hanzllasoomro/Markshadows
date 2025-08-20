import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null
};

const createNewOrder = createAsyncThunk("/order/createNewOrder", async (orderData) => {
    const response = await axios.post('http://localhost:3000/api/shop/order/create', orderData);
    return response.data;
});

export const getOrderDetails = createAsyncThunk(
    "order/getOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/orders/${orderId}`);
            return data; 
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch order details"
            );
        }
    }
);

export const capturePayment = createAsyncThunk(
    "order/capturePayment",
    async ({ orderId, paymentData }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `/api/orders/${orderId}/pay`,
                paymentData
            );
            return data; 
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Payment capture failed"
            );
        }
    }
);



const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL || null;
                state.orderId = action.payload.orderId || null;
                state.success = true;
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.orderId;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.orderId;
                state.success = true;
            })
            .addCase(capturePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default shoppingOrderSlice.reducer;

