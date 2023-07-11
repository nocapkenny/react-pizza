import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {CartItemType} from "./cartSlice";

type ParamsType= {
    sortBy:string,
    order:string,
    category:string,
    search:string,
    currentPage:string,
}
type ItemsType = {
    id:string;
    title:string;
    price:number;
    imageUrl:string;
    sizes:number[];
    types:number[];
}


export const fetchPizzas = createAsyncThunk<ItemsType[],ParamsType>(
    'pizza/fetchPizzasStatus',
    //@ts-ignore
    async ( params)=>{
        const { sortBy, order, category, search, currentPage } = params;
        const {data} = await axios.get<CartItemType[]>(`https://640762ff862956433e6e16ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data;
    }
)

export enum Status { //любые слова можно брать
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: ItemsType[];
    status: Status,
}

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
export const selectPizzaData = (state: RootState) => state.pizza


export default pizzasSlice.reducer