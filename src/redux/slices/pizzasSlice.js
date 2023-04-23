import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ( params)=>{
        const { sortBy, order, category, search, currentPage } = params
        const res = await axios.get(`https://640762ff862956433e6e16ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return res.data
    }
)


const initialState = {
    items: [],
    status: 'loading' // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state)=>{
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action)=>{
            state.status = 'success'
            state.items = action.payload
        },
        [fetchPizzas.rejected]: (state)=>{
            state.status = 'error'
            state.items = []
        }
    }
})



export default pizzasSlice.reducer