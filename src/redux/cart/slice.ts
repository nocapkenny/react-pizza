import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartSliceState} from "./types";
import {CartItemType} from "./types";



const {items, totalPrice} = getCartFromLS()

const initialState:CartSliceState = {
    totalPrice,
    items,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action:PayloadAction<string>){
            //@ts-ignore
            const findItem = state.items.find(obj => obj.id === action.payload.id)//@ts-ignore

            if(findItem){
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)

        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})//@ts-ignore


export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer