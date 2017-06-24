import { IColor } from './color';

export interface IOrder {
    _id: string,
    items: [{
        id: number,
        name: string,
        image: string,
        quantity: number,
        price: number,
        colors: Array<IColor>
    }],
    sum: number,
    datetime: string,
    collapse: boolean
}