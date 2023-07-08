import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";



export enum SortPropertyEnum{
    RATING_DESC='rating',
    RATING_ASC='-rating',
    TITLE_DESC='title',
    TITLE_ASC='-title',
    PRICE_DESC='price',
    PRICE_ASC='-price'
}

type Sort = {
    name:string,
    sortProperty:  SortPropertyEnum,
}

interface FilterSliceState {
    categoryId:number,
    currentPage: number,
    sort: Sort,
    searchValue: string,
}

const initialState:FilterSliceState = {
    categoryId:0,
    currentPage: 1,
    sort: {name: 'популярности(desc)', sortProperty: SortPropertyEnum.RATING_DESC},
    searchValue: '',
}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategoryId(state, action: PayloadAction<number>){
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<Sort>){
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>){
            state.currentPage = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>){
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }
})
export const selectFilter = (state: RootState) => state.filter



export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default  filterSlice.reducer