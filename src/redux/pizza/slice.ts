import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemsType,PizzaSliceState,Status} from "./types";
import {fetchPizzas} from "./asyncActions";

const initialState:PizzaSliceState = {
    items: [],
    status: Status.LOADING // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        //@ts-ignore
        setItems(state, action:PayloadAction<ItemsType>){
            //@ts-ignore
            state.items = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchPizzas.pending, (state:PizzaSliceState)=>{
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state:PizzaSliceState,action)=>{
            state.status = Status.SUCCESS
            state.items = action.payload
        })
        builder.addCase(fetchPizzas.rejected, (state:PizzaSliceState)=>{
            state.status = Status.ERROR
            state.items = []
        })
    }
})


export default pizzasSlice.reducer