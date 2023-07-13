import {RootState} from "../store";

export const selectPizzaById = (id:string) => (state:RootState) => state.cart.items.find(obj=>obj.id===id)