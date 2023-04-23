import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export default configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzasSlice

    },
})