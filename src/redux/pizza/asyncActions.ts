import {createAsyncThunk} from "@reduxjs/toolkit";
import {ItemsType, ParamsType} from "./types";
import {CartItemType} from "../cart/types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<ItemsType[],ParamsType>(
    'pizza/fetchPizzasStatus',
    //@ts-ignore
    async ( params)=>{
        const { sortBy, order, category, search, currentPage } = params;
        const {data} = await axios.get<CartItemType[]>(`https://640762ff862956433e6e16ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data;
    }
)