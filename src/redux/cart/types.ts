export type CartItemType = {count:number; size: number; price: number; imageUrl: string; id: string; title: string; type: string }

export interface CartSliceState{//интерфейс(для стейтов)=тайп
    totalPrice:number,
    items: CartItemType[],
}