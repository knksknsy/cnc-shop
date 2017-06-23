import { IColor } from './color';

export interface IOrder {
    items: [{
        id: number,
        name: string,
        image: string,
        quantity: number,
        price: number,
        colors: Array<IColor>
    }],
    sum: number
}