import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type CartItemType = {count:number; size: number; price: number; imageUrl: string; id: string; title: string; type: string }

interface CartSliceState{//интерфейс(для стейтов)=тайп
    totalPrice:number,
    items: CartItemType[],
}

const initialState:CartSliceState = {
    totalPrice: 0,
    items: []
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
            state.totalPrice = state.items.reduce((sum, obj) => {
                    return (obj.price * obj.count) + sum
                }, 0
            )
        },
        minusItem(state, action:PayloadAction<string>){
            //@ts-ignore
            const findItem = state.items.find(obj => obj.id === action.payload.id)//@ts-ignore

            if(findItem){
                findItem.count--
            }


        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})//@ts-ignore
export const selectPizzaById = (id) => (state:RootState) => state.cart.items.find(obj=>obj.id===id)

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer