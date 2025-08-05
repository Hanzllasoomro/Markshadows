import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from './admin-slice/products-slice';
import shoppingProductsSlice from './shop/products-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shoppingProducts: shoppingProductsSlice
    },
});
export default store;