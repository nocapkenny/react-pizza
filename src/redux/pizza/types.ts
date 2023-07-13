export type ParamsType= {
    sortBy:string,
    order:string,
    category:string,
    search:string,
    currentPage:string,
}
export type ItemsType = {
    id:string;
    title:string;
    price:number;
    imageUrl:string;
    sizes:number[];
    types:number[];
}
export enum Status { //любые слова можно брать
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: ItemsType[];
    status: Status,
}