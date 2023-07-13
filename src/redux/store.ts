import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './filter/slice'
import cartSlice from "./cart/slice";
import pizzasSlice from "./pizza/slice";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzasSlice

    },
});

export default store
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()