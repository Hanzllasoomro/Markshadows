import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from './admin-slice/products-slice';
import shoppingProductsSlice from './shop/products-slice';
import shoppingCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shoppingProducts: shoppingProductsSlice,
        shopCart : shoppingCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice
    },
});
export default store;