import { IColor } from './color';

export interface ICartItemProduct {
    id: number,
    name: string,
    image: string,
    price: number
}

export interface ICartItem {
    id?: string
    product: ICartItemProduct,
    colors: Array<IColor>,
    quantity: number
}